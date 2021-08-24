import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { products } from '../model/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  private _success = new Subject<string>();
  quantity = 1;
  staticAlertClosed = false;
  successMessage = '';

  @ViewChild('staticAlert', { static: false })
  staticAlert!: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  @Input() products: products;
  constructor(private cartService: CartService) {
    this.products = {
      id: 1,
      name: '',
      price: 0,
      url: '',
      quantity: 1,
      description: '',
    };
  }

  ngOnInit(): void {
    setTimeout(() => this.staticAlert.close(), 10000);

    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(1000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  addToCart(products: products) {
    products.quantity = this.quantity;

    this.cartService.addToCart(products, this.quantity);
    this._success.next(`${products.name} - successfully added to cart.`);
  }
}
