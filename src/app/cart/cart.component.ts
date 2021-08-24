import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { products } from '../model/product';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartList: products[] = [];
  total = 0;
  products: Observable<products[]> = new Observable<products[]>();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.products = this.cartService.productList;
    this.cartService.getCart().subscribe((res) => {
      this.cartList = res;
      this.total = this.cartService.getTotal();
    });
  }

  removeAllFromCart() {
    this.cartService.removeAll();
  }

  getTotal() {
    this.cartService.getTotal();
  }
}
