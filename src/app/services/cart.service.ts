import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItem : any = (localStorage.getItem('cartItem') !== null)?JSON.parse(localStorage.getItem('cartItem') || '{}'):[]
  cartCount = new BehaviorSubject<number>(0);
  cartBtnLabel = "Add To Cart"
  
  constructor() { }

  addToCart(event: any,product : any){
    if (localStorage.getItem("cartItem") !== null) {
      let item = JSON.parse(localStorage.getItem('item') || '{}');
      for (var k in item){
        if (item.hasOwnProperty(k)) {
          this.cartItem.push(item[k]); 
        }
      }
      this.cartItem.push(product);
    } else {
      this.cartItem.push(product);
    }
    localStorage.setItem("cartItem",JSON.stringify(this.cartItem))
    event.target.innerText = "Cart Added";
    this.cartPriceCalculation();
  }

  getCartCount() {
    let item = JSON.parse(localStorage.getItem('item') || '{}');
    this.cartCount = item.length
    return this.cartCount;
  }



  cartPriceCalculation(){
    const cartItem = JSON.parse(localStorage.getItem('cartItem') || '{}');
    let sessionPrice :any = 0
    let plaformFee :any = 0
    let totalPrice: any = 0;
    for (var k in cartItem){
      if (cartItem.hasOwnProperty(k)) {
        // console.log(cartItem[k]);
        sessionPrice = parseInt(sessionPrice) + parseInt(cartItem[k].teacher_fee);
        plaformFee = parseInt(plaformFee) + parseInt(cartItem[k].commission_amount);
      }
    }
    totalPrice = parseInt(sessionPrice) + parseInt(plaformFee);
    this.gstCalculate(totalPrice)
    localStorage.setItem("sessionPrice",sessionPrice)
    localStorage.setItem("plaformFee",plaformFee)
    localStorage.setItem("totalPrice",totalPrice)    
    localStorage.setItem("cartItemCount",cartItem.length)
    this.cartCount.next(cartItem.length)
    console.log(this.cartCount.value);
    
  }

  getItemFromCart(){

  }

  gstCalculate(totalPrice: number) {
    let taxRate  : number = 18;
    let taxAmount : any = totalPrice*taxRate/parseInt("100");
    localStorage.setItem("taxAmount",taxAmount)
    let payableAmount :any = totalPrice+parseInt(taxAmount);   
    localStorage.setItem("payableAmount",payableAmount)   
  }

}
