import { Component, OnInit } from '@angular/core';
import { user } from '../model/user';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.css'],
})
export class ConfirmedComponent implements OnInit {
  orders: user = new user();
  total = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.total = this.cartService.getTotal();
    this.cartService.removeAll();
  }

  getOrderDetails(user: user) {
    this.orders.fullName = user.fullName;
    this.orders.address = user.address;
    this.orders.creditCard = user.creditCard;
  }
}
