import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category, CategoryService } from '../../services/categorie.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css' // optionnel, si tu veux styliser plus
})
export class FilterComponent implements OnInit {
  defaultPrice: number = 1000;
  selectedPrice: number = this.defaultPrice;
  minPrice: number = 20;
  maxPrice: number = 2000;
  categories: Category[] = [];
  selectedCategoryId: number | null = null;

  @Output() categoryChanged = new EventEmitter<number | null>();
  @Output() priceChanged = new EventEmitter<number>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    );
  }

  onCategoryChange(categoryID: number | null): void {
    this.selectedCategoryId = categoryID ?? null;
    this.categoryChanged.emit(this.selectedCategoryId);
  }

  onPriceChange(event: any): void {
    this.selectedPrice = +event.target.value;
    this.priceChanged.emit(this.selectedPrice);
  }

  resetFilters(): void {
    this.selectedCategoryId = null;
    this.categoryChanged.emit(null);
    this.selectedPrice = this.defaultPrice;
    this.priceChanged.emit(this.selectedPrice);
  }
}
