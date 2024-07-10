import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { SigninService } from '../../services/signin.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,AbstractControl  } from '@angular/forms';
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
    'payableAmount' : (localStorage.getItem('payableAmount') !== null)?localStorage.getItem('payableAmount'):0,
  }
  user : any = (localStorage.getItem('user') === null)?localStorage.getItem('user'):JSON.parse(localStorage.getItem('user') || '{}');
  accessToken: any = (localStorage.getItem('access_token') === null)?localStorage.getItem('access_token'):JSON.parse(localStorage.getItem('access_token') || '{}');
  cartPriceWithGst : any = 0;
  loginForm: FormGroup | any;
  signupForm: FormGroup | any;
  message : any = null;
  confirmPay = false;
  otpSent = false;
  otpValue : any;
  states :any = [];
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
        mobile: ['', [Validators.required]], 
        otp:[''],
      });

      this.signupForm = this.fb.group(
        {
          firstname:['', [Validators.required]],
          lastname:['', [Validators.required]],
          email:['', [Validators.required]],
          mobile: ['', [Validators.required]], 
          pan:['', [Validators.required]],
          address:[''],
          state:[''],
          pincode:[''],
          otp:[''],
        }
      );
    }

    ngOnInit(): void {
      this.getStates();   
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
        });
    }

    login() {
      if(this.loginForm.value.otp == this.otpValue) {
        this.signin.signinUser(this.loginForm.value).subscribe(data => {
          this.signin.setToken(data);
          this.accessToken = data;
          this.signin.getUserData(this.accessToken.access_token).subscribe((res: any) => {
            this.user = res
            localStorage.setItem("user", JSON.stringify(res));
            this.confirmPay = true
           });
        });
      } else {
        this.toastr.error('Please enter valid Otp','Invalid Credentials');
      }
    }

    onSubmit() {
      if(this.signupForm.value.otp == this.otpValue) {
        this.signupUser()
      } else {
        this.toastr.error('Please enter valid Otp','Invalid Credentials');
      }
    }

    showError(){
      this.signupForm.markAllAsTouched();
    }

    signupUser(){
      console.log("valid",this.signupForm);
      let signUpUser = {
        'user': {
          'name':this.signupForm.value.firstname+' '+this.signupForm.value.lastname,
          'email':this.signupForm.value.email,
          'mobile':this.signupForm.value.mobile
        },
        'userMeta':{
          'address':this.signupForm.value.address,
          'pan':this.signupForm.value.pan,
          'state':this.signupForm.value.state,
          'pincode':this.signupForm.value.pincode
        }
      }
      this.signin.signupUser(signUpUser)
        .subscribe((data: any) => {
          this.signin.setToken(data);
          this.accessToken = data;
          this.signin.getUserData(this.accessToken.access_token).subscribe((res: any) => {
            localStorage.setItem("user", JSON.stringify(res));
            window.location.reload();
          });
        },(error) => {
          this.toastr.error('Failed to register','Error');
        });
    }

    getOtp(){
      if(this.signupForm.valid) {
        let mobile = {
          'mobile' : this.signupForm.value.mobile
        }
        this.api.post('get-otp',mobile).subscribe((data) => {
          console.log(data);
          this.otpValue = data
          this.otpSent = true
        })
      } else {
        this.signupForm.markAllAsTouched();
      }
    }

    getMobileOtp(){
      if(this.loginForm.valid) {
        let mobile = {
          'mobile' : this.loginForm.value.mobile
        }
        this.api.post('get-otp',mobile).subscribe((data) => {
          console.log(data);
          this.otpValue = data
          this.otpSent = true
        })
      } else {
        this.loginForm.markAllAsTouched();
      }
    }
    
    getStates(){
      this.api.get("all-states").subscribe((res) => {
        this.states = res;
      })
    }
    
}
