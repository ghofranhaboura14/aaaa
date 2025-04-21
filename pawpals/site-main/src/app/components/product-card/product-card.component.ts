import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../services/product.service';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule ]
})
export class ProductCardComponent {
  @Input() product!: Product;
  selectedQuantity: number = 1;

  constructor(private http: HttpClient) {}

  get produitID(): string {
    return this.product?.produitID?.toString() || '';
  }

  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating || 0)).fill(0);
  }

  getEmptyStarsArray(rating: number): number[] {
    return Array(5 - Math.floor(rating || 0)).fill(0);
  }

  addToCart(): void {
    this.http.post(
      `http://localhost:5000/Cart/add`,
      { produitID: this.produitID, quantite: this.selectedQuantity },
      { withCredentials: true }
    ).subscribe(
      () => {
        alert('Produit ajouté au panier !');
      },
      (error) => {
        console.error('Erreur ajout panier :', error);
        if (error.status === 400) {
          alert("La quantité demandée dépasse le stock disponible.");
        } else if (error.status === 401) {
          alert("Veuillez vous authentifier.");
        } else {
          alert("Erreur lors de l’ajout au panier.");
        }
      }
    );
  }
}
