import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItem : any = [];
  cartBtnLabel = "Add To Cart"
  cartPrice : any = 0;;
  constructor() { }

  addToCart(event: any,product : any){
    if (localStorage.getItem("item") !== null) {
      let item = JSON.parse(localStorage.getItem('item') || '{}');
      this.cartItem = [];
      for (var k in item){
        if (item.hasOwnProperty(k)) {
            this.cartItem.push(item[k]); 
            this.cartPrice += parseInt(item[k].price)
        }
      }
      this.cartItem.push(product);
    } else {
      this.cartPrice += parseInt(product.price);
      this.cartItem.push(product);
    }
    console.log(this.cartPrice);
    
    localStorage.setItem("cartPrice",this.cartPrice)
    localStorage.setItem("item",JSON.stringify(this.cartItem))
    event.target.innerText = "Cart Added";
  }

  getItemFromCart(){

  }
}
