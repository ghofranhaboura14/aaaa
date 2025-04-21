import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-featured-components',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './featured-components.component.html',
  styleUrl: './featured-components.component.css'
})
export class FeaturedComponentsComponent implements OnInit, AfterViewInit, OnDestroy {
  products: Product[] = [];
  @ViewChild('carousel', { static: false }) carouselRef!: ElementRef;

  private autoScrollInterval: any;
  private scrollDirection: number = 1; // 1 = droite, -1 = gauche

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => this.products = data,
      (error) => console.error('Error fetching products:', error)
    );
  }

  ngAfterViewInit(): void {
    this.startAutoScroll();
  }

  scrollCarousel(direction: number): void {
    const carousel = this.carouselRef.nativeElement;
    const scrollAmount = 320;
    carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }

  startAutoScroll(): void {
    const carousel = this.carouselRef.nativeElement;
  
    this.autoScrollInterval = setInterval(() => {
      const scrollAmount = 320; // combien de pixels avancer à chaque fois
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  
      // Si on atteint la fin, repartir au début doucement
      if (carousel.scrollLeft + scrollAmount >= maxScrollLeft) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 5000); // toutes les 5 secondes
  }
  

  ngOnDestroy(): void {
    clearInterval(this.autoScrollInterval);
  }
}
