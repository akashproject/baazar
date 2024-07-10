import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartItem : any = (localStorage.getItem('cartItem') !== null)?JSON.parse(localStorage.getItem('cartItem') || '{}'):[];
  mediaURL: any = '';
  cartPrice : any = (localStorage.getItem('totalPrice') !== null)?localStorage.getItem('totalPrice'):0;
  payableAmount : any = (localStorage.getItem('payableAmount') !== null)?localStorage.getItem('payableAmount'):0;
  taxAmount : any = (localStorage.getItem('taxAmount') !== null)?localStorage.getItem('taxAmount'):0;
  sessionPrice : any = (localStorage.getItem('sessionPrice') !== null)?localStorage.getItem('sessionPrice'):0;
  plaformFee : any = (localStorage.getItem('plaformFee') !== null)?localStorage.getItem('plaformFee'):0;
  updateCartBtn = false
  coupon:any = 'BAAZARUP100'
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    public cart: CartService,
    private toastr: ToastrService) {
      this.mediaURL = environment.mediaURL;
      
    }

    ngOnInit(): void {      
      this.cart.cartPriceCalculation();
      console.log(this.cartItem.length);
      
    }


    removeFromCart(event : any, item:any) {
      this.updateCartBtn = true

      const index = this.cartItem.indexOf(item);
      console.log(index);
      
      if (index > -1) {
        this.cartItem.splice(index, 1);
      }

      localStorage.setItem("cartItem",JSON.stringify(this.cartItem))
      this.cart.cartPriceCalculation();
    }

    updateCart(){
      window.location.reload()
    }

    applyCoupon(){
      this.api.post('apply-coupon',{'code':this.coupon}).subscribe((data) => {
        console.log(data);
        
      })
    }


}
