import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent  implements OnInit{
  public cartItem : any = (localStorage.getItem('cartItem') === null)?localStorage.getItem('cartItem'):JSON.parse(localStorage.getItem('cartItem') || '{}');
  mediaURL: any = '';
  cartPrice : any = (localStorage.getItem('cartPrice') !== null)?localStorage.getItem('cartPrice'):0;
  plaformFee : any = (localStorage.getItem('plaformFee') !== null)?localStorage.getItem('plaformFee'):0;
  taxAmount : any = (localStorage.getItem('taxAmount') !== null)?localStorage.getItem('taxAmount'):0;
  totalPrice : any = (localStorage.getItem('totalPrice') !== null)?localStorage.getItem('totalPrice'):0;
  sessionPrice : any = (localStorage.getItem('sessionPrice') !== null)?localStorage.getItem('sessionPrice'):0;
  
  cartPriceWithGst : any = 0;

  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    public cart: CartService,
    public order: OrderService,
    private toastr: ToastrService) {
      this.mediaURL = environment.mediaURL;   
    }

    ngOnInit(): void {
      console.log(this.cartItem);
    }


    createOrder(){
      const order: any = {
        'amount': this.totalPrice,
        'tax': this.taxAmount,
        'plaform_fee': this.plaformFee,
        'session_price': this.sessionPrice,
        'batches': this.cartItem
      }
      
      console.log(order);
      this.order.createOrder(order)
          .subscribe((response: any) => {
            console.log(response);
            // localStorage.removeItem("cartItem");
            // localStorage.removeItem("plaformFee");
            // localStorage.removeItem("taxAmount");
            // localStorage.removeItem("sessionPrice");
            this.router.navigate(['/dashboard']);
          }, (error: any) => {
            console.error('Create order error', error);
        });
    }
    
    
}
