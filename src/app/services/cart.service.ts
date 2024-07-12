import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartCount = new BehaviorSubject<number>(0);
  cartBtnLabel = "Add To Cart"
  cart : any = {
    'cartItem' : [],
    'sessionPrice':0,
    'plaformFee':0,
    'totalPrice':0,
    'taxAmount':0,
    'cartItemCount':null,
    'payableAmount':0,
    'coupon' : null
  }

  constructor() { }

  addToCart(event: any,product : any){
    console.log(localStorage.getItem("cartItem"));
    let item : any = [];
    if (localStorage.getItem("cartItem") !== null) {
      item = JSON.parse(localStorage.getItem('cartItem') || '{}');
      item.push(product);
    } else {
      item.push(product);
    }
    localStorage.setItem("cartItem",JSON.stringify(item))
    event.target.innerText = "Cart Added";
    this.cartPriceCalculation();
  }



  getCartCount() {
    let item = JSON.parse(localStorage.getItem('cartItem') || '{}');
    this.cartCount = item.length
    return this.cartCount;
  }



  cartPriceCalculation(){ 
    
    const cartItem = JSON.parse(localStorage.getItem('cartItem') || '{}');
    if(Object.keys(cartItem).length > 0){
      let sessionPrice :any = 0
      let plaformFee :any = 0
      let totalPrice: any = 0;
      for (var k in cartItem){
        if (cartItem.hasOwnProperty(k)) {
          // console.log(cartItem[k]);
          sessionPrice = parseInt(sessionPrice) + parseInt(cartItem[k].teacher_fee)
          plaformFee = parseInt(plaformFee) + parseInt(cartItem[k].commission_amount)
        }
      }
      totalPrice = parseInt(sessionPrice) + parseInt(plaformFee)
      let taxAmount = this.gstCalculate(totalPrice);
      let payableAmount:any = totalPrice+parseInt(taxAmount)
  
      this.cartCount.next(cartItem.length)
      
      if(this.cart.coupon !== null){
        payableAmount = payableAmount - this.cart.coupon.discount
        this.cart.payableAmount = payableAmount
      }
      this.cart.cartItem = cartItem
      this.cart.sessionPrice = sessionPrice
      this.cart.plaformFee = plaformFee
      this.cart.totalPrice = totalPrice
      this.cart.cartItemCount = cartItem.length
      this.cart.taxAmount = taxAmount
      this.cart.payableAmount = payableAmount
  
      console.log(this.cart);  
    }    
  }

  gstCalculate(totalPrice: number) {
    let taxRate  : number = 18;
    let taxAmount : any = totalPrice*taxRate/parseInt("100");
    return taxAmount
  }

}
