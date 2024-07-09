import {Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  JWT_KEY = 'access_token';
  private user = new BehaviorSubject(null);
  constructor(private http: HttpClient,private api: ApiService) { }

  createOrder(createOrder: any) {
    let token = JSON.parse(localStorage.getItem('access_token') || '{}')
    
    const header = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .set('Authorization', `Bearer ${token.access_token}`),
    };
    const params = this.api.JSON_to_URLEncoded(createOrder);
    return this.http.post(`${environment.apiUrl}create-order`, params, header);
  }

  orderComplete(confirmOrder:any){
    let token = JSON.parse(localStorage.getItem('access_token') || '{}')
    
    const header = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .set('Authorization', `Bearer ${token.access_token}`),
    };
    const params = this.api.JSON_to_URLEncoded(confirmOrder);
    return this.http.post(`${environment.apiUrl}payment`, params, header);
  }
}
