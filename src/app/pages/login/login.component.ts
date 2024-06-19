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
        mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Validate 10-digit mobile number
        password: ['', [Validators.required, Validators.minLength(8)]]
      });
    }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login() {
    if (this.loginForm.valid) {
      const mobile = this.loginForm.get('mobile')?.value;
      const password = this.loginForm.get('password')?.value;
      // Implement your login logic here
      console.log('Mobile:', mobile);
      console.log('Password:', password);
      this.signinservice.signinUser(this.loginForm).subscribe(data => {
        this.signinservice.setToken(data);
        this.token_data = data;
        this.token = this.token_data.access_token;
        console.log(this.token);
  
        this.router.navigate(['/home']);
  
      }, (err: any) => {
        // err = err
        console.log(err);
        // this.displayToastFailure();
      });

    } else {
      // Handle form errors
      console.log('Form is invalid');
    }
  }

}
