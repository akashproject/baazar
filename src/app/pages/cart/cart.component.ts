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
  cartItem : any = (localStorage.getItem('cartItem') !== null)?JSON.parse(localStorage.getItem('cartItem') || '{}'):null;
  mediaURL: any = '';
  updateCartBtn = false
  couponCode:any = 'BAAZARUP100';
  coupon :any = null
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
    }

    removeFromCart(event : any, item:any) {
      this.updateCartBtn = true
      const index = this.cartItem.indexOf(item);      
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
      this.api.post('apply-coupon',{'code':this.couponCode}).subscribe((data) => {
        if(Object.keys(data).length > 0){
          this.cart.cart.coupon = data
          this.cart.cartPriceCalculation();
          this.toastr.success('Coupon successfully applied','Congratulations');
        } else {
          this.toastr.error('Coupon is Expired or Invalid','Invalid Coupon');
        }
      },(error) =>{
        this.toastr.error('Coupon is Expired or Invalid','Invalid Coupon');
      })
    }


}
