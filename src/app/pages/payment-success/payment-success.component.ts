import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent implements OnInit {
  mediaURL: any = '';
  confirmOrder = (localStorage.getItem('order') === null)?localStorage.getItem('order'):JSON.parse(localStorage.getItem('order') || '{}');
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
      this.orderComplete()
      console.log(this.confirmOrder);
    }

    orderComplete() {
      let payment : any = {
        'order_id':this.confirmOrder.id,
        'type': "Credit Card",
        'card_type':"Visa",
        'card':"3003",
        'amount':this.confirmOrder.amount,
        'payment_id':"12547890",
        'status':"paid"
      }

      this.order.createComplete(payment)
        .subscribe((response: any) => {
         console.log(response);
         
        }, (error: any) => {
          console.error('Create order error', error);
      });
    }

}
