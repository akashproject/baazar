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
        password: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
    console.log("init");
    
  }

  login() {
    if(this.loginForm.valid) {
      this.signinservice.signinUser(this.loginForm.value).subscribe(data => {
        this.signinservice.setToken(data);
        this.token_data = data;
        this.signinservice.getUserData(this.token_data.access_token).subscribe((res: any) => {
          localStorage.setItem("user", JSON.stringify(res));
          this.router.navigate(['/dashboard']);
         });
      }, (err: any) => {
        // err = err
        console.log(err);
        // this.displayToastFailure();
      });

    }
  }

}
