import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { products } from '../model/product';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem = new products();

  products: Observable<products[]> = new Observable<products[]>();
  total: Observable<number> = new Observable<number>();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.products = this.cartService.productList;
    this.total = this.cartService.total;
  }
  updateProduct(ev: number) {
    this.cartItem.quantity = ev;
    this.cartService.updatedProduct();
  }
  removeSelectedItem(cartItem: products) {
    this.cartService.removeSelectedProduct(cartItem);
  }
}
