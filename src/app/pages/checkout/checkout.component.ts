import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent  implements OnInit{
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
      console.log(this.cartItem);
    }
    
    
}
