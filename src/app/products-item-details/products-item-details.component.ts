import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../model/product';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-products-item-details',
  templateUrl: './products-item-details.component.html',
  styleUrls: ['./products-item-details.component.css'],
})
export class ProductsItemDetailsComponent implements OnInit {
  productDetails: products;
  id = 1;
  name = '';
  price = 0;
  url = '';
  quantity = 1;
  description = '';

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';

  @ViewChild('staticAlert', { static: false })
  staticAlert!: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.productDetails = {
      id: this.id,
      name: this.name,
      price: this.price,
      url: this.url,
      quantity: this.quantity,
      description: this.description,
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

    //grabbing the id in the params
    let id = this.route.snapshot.params['id'];
    //calling get products by id function and passing it the id
    this.productService.getProductById(id).subscribe((res: products) => {
      this.productDetails = res;
    });
  }

  addToCart(product: products) {
    product.quantity = this.quantity;
    this.cartService.addToCart(product, this.quantity);

    this._success.next(
      `${this.productDetails.name} - successfully added to cart.`
    );
  }
}
