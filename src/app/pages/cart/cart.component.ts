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
  public cartItem : any = (localStorage.getItem('item') === null)?localStorage.getItem('item'):JSON.parse(localStorage.getItem('item') || '{}');
  mediaURL: any = '';
  cartPrice : any = (localStorage.getItem('cartPrice') !== null)?localStorage.getItem('cartPrice'):0;
  cartPriceWithGst : any = 0;
  taxAmount : number = 0;
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    public cart: CartService,
    private toastr: ToastrService) {
      this.mediaURL = environment.mediaURL;
      
    }

    ngOnInit(): void {
      console.log(this.cartPrice);
      this.totalCartPrice()
    }

    getItemFromCart() {
      
    }

    totalCartPrice() {
      let taxRate  : number = 18;
      this.taxAmount = this.cartPrice*taxRate/parseInt("100");
      this.cartPriceWithGst = parseInt(this.cartPrice)+this.taxAmount;      
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
