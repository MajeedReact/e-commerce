import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { user } from '../model/user';
@Component({
  selector: 'app-checkout-details',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.css'],
})
export class CheckoutDetailsComponent implements OnInit {
  @Output() orderDetails: EventEmitter<user> = new EventEmitter();

  fullName = '';
  address = '';
  creditCard = '';
  constructor() {}

  ngOnInit(): void {}

  submitForm() {
    const user: user = {
      fullName: this.fullName,
      address: this.address,
      creditCard: this.creditCard,
    };

    this.orderDetails.emit(user);
  }
  numberOnly(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
