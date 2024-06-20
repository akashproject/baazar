import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartBtnLabel = "Add To Cart"
  constructor() { }

  addToCart(event: any,product : any){
    localStorage.setItem("item",JSON.stringify(product))
    event.target.innerText = "Cart Added";
  }

  getItemFromCart(){

  }
}
