import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { SigninService } from '../../services/signin.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  mediaURL: any = '';
  token_data: any;
  access_token: any = "";
  token: string | undefined;
  loginForm: FormGroup | any;
  otpSent = false;
  otpValue : any;
  constructor(
    private router: Router,
    private api: ApiService,
    private fb: FormBuilder,
    private signinservice: SigninService,
    public util: UtilService,
    private toastr: ToastrService) {
      this.mediaURL = environment.mediaURL;
      this.loginForm = this.fb.group({
        mobile: ['', [Validators.required]], // Validate 10-digit mobile number
        otp:[''],
      });
    }

  ngOnInit(): void {
    console.log("init");
    
  }

  getMobileOtp(){
    if(this.loginForm.valid) {
      let mobile = {
        'mobile' : this.loginForm.value.mobile
      }
      this.api.post('get-otp',mobile).subscribe((data) => {
        this.otpValue = data
        this.otpSent = true
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  login() {
    if(this.loginForm.value.otp == this.otpValue) {
      this.signinservice.signinUser(this.loginForm.value).subscribe((data: any) => {
        console.log(data);
        this.signinservice.setToken(data);
        this.token_data = data;
        this.signinservice.getUserData(this.token_data.access_token).subscribe((res: any) => {
          localStorage.setItem("user", JSON.stringify(res));
          this.router.navigate(['/dashboard']);
         });
      },((error) => {
        this.toastr.error('Please enter valid Credential','Invalid Credentials');
       }));
    } else {
      this.toastr.error('Please enter valid Otp','Invalid Credentials');
    }
  }

}
