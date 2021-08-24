import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { products } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { first, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<products[]> {
    return this.http.get<products[]>('./assets/data.json');
  }

  getProductById(id: number): Observable<products> {
    return this.getProducts().pipe(
      mergeMap((result) => result),
      first((product) => product.id == id)
    );
  }
}
