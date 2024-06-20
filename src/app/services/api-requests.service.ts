import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orders } from './table-data.model';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http
    .get<Orders>('https://geeksoft.pl/assets/order-data.json');
  }
}
