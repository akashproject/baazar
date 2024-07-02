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
export class CartComponent {
  cartItem : any = (localStorage.getItem('cartItem') !== null)?JSON.parse(localStorage.getItem('cartItem') || '{}'):null;
  mediaURL: any = '';
  cartPrice : any = (localStorage.getItem('totalPrice') !== null)?localStorage.getItem('totalPrice'):0;
  payableAmount : any = (localStorage.getItem('payableAmount') !== null)?localStorage.getItem('payableAmount'):0;
  taxAmount : any = (localStorage.getItem('taxAmount') !== null)?localStorage.getItem('taxAmount'):0;
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    public cart: CartService,
    private toastr: ToastrService) {
      this.mediaURL = environment.mediaURL;
      
    }

    ngOnInit(): void {
      
    }

    getItemFromCart() {
      
    }

    totalCartPrice() {
      
    }

    removeFromCart(event : any, batch_id:any) {
      console.log(this.cartItem);

      for (const key in this.cartItem) {
        if (Object.prototype.hasOwnProperty.call(this.cartItem, key)) {
          if(batch_id == this.cartItem[key].batch_id) {
            console.log(this.cartItem[key]);
            this.cartPrice = this.cartPrice - this.cartItem[key].price
            localStorage.setItem("cartPrice",this.cartPrice)
            this.cartItem.pop(this.cartItem[key]);
            this.totalCartPrice()
          }
        }
      }

      localStorage.setItem("item",JSON.stringify(this.cartItem))
    }


}
