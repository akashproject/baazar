import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { SigninService } from '../../services/signin.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent  implements OnInit{
  mediaURL: any = '';
  orderCreate : any = {
    'cartItem' : (localStorage.getItem('cartItem') === null)?localStorage.getItem('cartItem'):JSON.parse(localStorage.getItem('cartItem') || '{}'),
    'plaformFee': (localStorage.getItem('plaformFee') !== null)?localStorage.getItem('plaformFee'):0,
    'taxAmount' : (localStorage.getItem('taxAmount') !== null)?localStorage.getItem('taxAmount'):0,
    'totalPrice' : (localStorage.getItem('totalPrice') !== null)?localStorage.getItem('totalPrice'):0,
    'sessionPrice' : (localStorage.getItem('sessionPrice') !== null)?localStorage.getItem('sessionPrice'):0,
    'payableAmount' : (localStorage.getItem('payableAmount') !== null)?localStorage.getItem('payableAmount'):0
  }
  user : any = (localStorage.getItem('user') === null)?localStorage.getItem('user'):JSON.parse(localStorage.getItem('user') || '{}');

  accessToken: any = (localStorage.getItem('access_token') === null)?localStorage.getItem('access_token'):JSON.parse(localStorage.getItem('access_token') || '{}');
  cartPriceWithGst : any = 0;
  loginForm: FormGroup | any;
  signupForm: FormGroup | any;
  message : any = null;
  confirmPay = false;
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    public cart: CartService,
    public order: OrderService,
    private fb: FormBuilder,
    private signin: SigninService,
    private toastr: ToastrService) {
      this.mediaURL = environment.mediaURL;   
      this.loginForm = this.fb.group({
        mobile: ['', [Validators.required]], // Validate 10-digit mobile number
        password: ['', [Validators.required]]
      });

      this.signupForm = this.fb.group({
        firstname:['', [Validators.required]],
        lastname:['', [Validators.required]],
        email:['', [Validators.required]],
        mobile: ['', [Validators.required]], // Validate 10-digit mobile number
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      });
    }

    ngOnInit(): void {
    }


    createOrder(){
      this.order.createOrder(this.orderCreate)
        .subscribe((response: any) => {
          localStorage.setItem('order',JSON.stringify(response))
          localStorage.removeItem("cartItem");
          localStorage.removeItem("plaformFee");
          localStorage.removeItem("taxAmount");
          localStorage.removeItem("sessionPrice");
          this.router.navigate(['/payment-success']);
        }, (error: any) => {
          console.error('Create order error', error);
      });
    }

    login() {
      if(this.loginForm.valid) {
        this.signin.signinUser(this.loginForm.value).subscribe(data => {
          this.signin.setToken(data);
          this.accessToken = data;
          this.signin.getUserData(this.accessToken.access_token).subscribe((res: any) => {
            this.user = res
            localStorage.setItem("user", JSON.stringify(res));
            this.confirmPay = true
           });
        }, (err: any) => {
          // err = err
          this.message = "Invalid Credentials"
          // this.displayToastFailure();
        });
  
      }
    }

    onSubmit() {      
      console.log(this.signupForm.value);
      
      if(this.signupForm.valid) {
        console.log("valid",this.signupForm);
        this.signupForm.value.name = this.signupForm.value.firstname+' '+this.signupForm.value.lastname
        this.signin.signupUser(this.signupForm.value)
          .subscribe((data: any) => {
            this.signin.setToken(data);
            this.accessToken = data;
            this.signin.getUserData(this.accessToken.access_token).subscribe((res: any) => {
              localStorage.setItem("user", JSON.stringify(res));
              this.confirmPay = true
            });
            this.confirmPay = true
          }, (error: any) => {
            console.error('Sign up error', error);
        });
      }
    }
    
    
}
