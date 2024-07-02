import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItem : any = (localStorage.getItem('item') !== null)?JSON.parse(localStorage.getItem('item') || '{}'):[]
  cartBtnLabel = "Add To Cart"
  sessionPrice : any = localStorage.getItem("sessionPrice")?localStorage.getItem("sessionPrice"):0;
  plaformFee : any = localStorage.getItem("plaformFee")?localStorage.getItem("plaformFee"):0;
  totalPrice : any = localStorage.getItem("totalPrice")?localStorage.getItem("totalPrice"):0;
  taxAmount : any = localStorage.getItem("taxAmount")?localStorage.getItem("taxAmount"):0;
  payableAmount : any = localStorage.getItem("payableAmount")?localStorage.getItem("payableAmount"):0;
  constructor() { }

  addToCart(event: any,product : any){
    if (localStorage.getItem("item") !== null) {
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

    this.sessionPrice = parseInt(this.sessionPrice) + parseInt(product.teacher_fee);
    this.plaformFee = parseInt(this.plaformFee) + parseInt(product.commission_amount);
    this.totalPrice = parseInt(this.totalPrice) + parseInt(product.price);

    localStorage.setItem("cartItem",JSON.stringify(this.cartItem))
    localStorage.setItem("totalPrice",this.totalPrice)
    localStorage.setItem("plaformFee",this.plaformFee)
    localStorage.setItem("sessionPrice",this.sessionPrice)
    this.gstCalculate()
    event.target.innerText = "Cart Added";
  }

  gstCalculate() {
    let taxRate  : number = 18;
    this.taxAmount = this.totalPrice*taxRate/parseInt("100");
    localStorage.setItem("taxAmount",this.taxAmount)
    this.payableAmount = parseInt(this.totalPrice)+this.taxAmount;   
    localStorage.setItem("payableAmount",this.payableAmount)   
  }

  getItemFromCart(){

  }

}
