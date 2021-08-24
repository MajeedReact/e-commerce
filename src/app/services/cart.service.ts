import { Injectable } from '@angular/core';
import { products } from '../model/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartList: products[] = [];

  productList = new BehaviorSubject<products[]>([]);
  total: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  getCart() {
    return this.productList.asObservable();
  }

  addToCart(product: products, quantity: number) {
    let productExist: products | undefined = this.cartList.find(
      (p) => p.id == product.id
    );
    if (productExist) {
      productExist.quantity += quantity;
    } else {
      product.quantity = quantity;
      this.cartList.push(product);
    }

    this.productList.next(this.cartList);
    this.total.next(this.getTotal());
  }

  updatedProduct() {
    this.productList.next(this.cartList);
    this.total.next(this.getTotal());
  }
  removeSelectedProduct(product: products) {
    this.cartList.map((element: products, index: number) => {
      if (element.id === product.id) this.cartList.splice(index, 1);
    });
    this.productList.next(this.cartList);
  }
  removeAll() {
    this.cartList = [];
    this.productList.next(this.cartList);
  }

  getTotal() {
    let total = 0;
    this.cartList.forEach((product) => {
      total += product.quantity * product.price;
    });
    return total;
  }
}
