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
      console.log(this.cartPriceWithGst);
      
    }

    removeFromCart(event : any) {
      event.target.parentNode.parentNode.parentNode.remove();
    }


}
