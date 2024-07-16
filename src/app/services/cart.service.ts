import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartCount = new BehaviorSubject<number>(0);
  cartBtnLabel = "Add To Cart"
  public cart : any = {
    'cartItem' : [],
    'sessionPrice':0,
    'plaformFee':0,
    'totalPrice':0,
    'taxAmount':0,
    'cartItemCount':null,
    'payableAmount':0,
    'coupon' : null
  }

  constructor(private toastr: ToastrService) { }

  addToCart(event: any,product : any){
   
    let item = (localStorage.getItem('cartItem') !== null)?JSON.parse(localStorage.getItem('cartItem') || '{}'):[];
    if (Object.keys(item).length > 0) {
        const result = item.filter((f : any) =>
          f.batch_id === product.batch_id &&
          f.course === product.course
        );

        if(result.length > 0){
          this.toastr.error('This item alreay exist in cart','Already Exist');
        } else {
          item.push(product);
          event.target.innerText = "Cart Added";
        }
    } else {
      item.push(product);
      event.target.innerText = "Cart Added";
    }
    localStorage.setItem("cartItem",JSON.stringify(item))
    this.cartPriceCalculation();
  }

  getCartCount() {
    let item = JSON.parse(localStorage.getItem('cartItem') || '{}');
    this.cartCount = item.length
    return this.cartCount;
  }



  cartPriceCalculation(){ 
    
    const cartItem = JSON.parse(localStorage.getItem('cartItem') || '{}');
    let sessionPrice :any = 0
    let plaformFee :any = 0
    let totalPrice: any = 0;
    if(Object.keys(cartItem).length > 0){
      for (var k in cartItem){
        if (cartItem.hasOwnProperty(k)) {
          // console.log(cartItem[k]);
          sessionPrice = parseInt(sessionPrice) + parseInt(cartItem[k].teacher_fee)
          plaformFee = parseInt(plaformFee) + parseInt(cartItem[k].commission_amount)
        }
      }
      
      totalPrice = parseInt(sessionPrice) + parseInt(plaformFee)
      if(this.cart.coupon !== null){
        totalPrice = totalPrice - this.cart.coupon.discount
      }
      
      let taxAmount = this.gstCalculate(totalPrice);
      let payableAmount:any = totalPrice+parseInt(taxAmount)
      this.cart.payableAmount = payableAmount
      this.cartCount.next(cartItem.length)
      this.cart.cartItem = cartItem
      this.cart.sessionPrice = sessionPrice
      this.cart.plaformFee = plaformFee
      this.cart.totalPrice = totalPrice 
      this.cart.taxAmount = taxAmount
      this.cart.payableAmount = payableAmount
    }  
    this.cart.cartItemCount = cartItem.length
  }

  gstCalculate(totalPrice: number) {
    let taxRate  : number = 18;
    let taxAmount : any = totalPrice*taxRate/parseInt("100");
    return taxAmount
  }

}
