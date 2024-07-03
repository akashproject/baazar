import { Component } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { SigninService } from '../../services/signin.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  mediaURL: any = '';
  token_data: any;
  access_token: any = "";
  token: string | undefined;
  signupForm: FormGroup | any;

  constructor(
    private router: Router,
    private api: ApiService,
    private fb: FormBuilder,
    private signin: SigninService,
    public util: UtilService,
    private toastr: ToastrService) {
      this.mediaURL = environment.mediaURL;
      this.signupForm = this.fb.group({
        firstname:['', [Validators.required]],
        lastname:['', [Validators.required]],
        email:['', [Validators.required]],
        mobile: ['', [Validators.required]], // Validate 10-digit mobile number
        password: ['', [Validators.required]]
      });
    }


    onSubmit() {      
      if(this.signupForm.valid) {
        console.log("valid",this.signupForm);
        this.signupForm.value.name = this.signupForm.value.firstname+' '+this.signupForm.value.lastname
        this.signin.signupUser(this.signupForm.value)
          .subscribe((response: any) => {
            console.log(response);
            this.router.navigate(['/login']);
          }, (error: any) => {
            console.error('Sign up error', error);
        });
      }
    }

}
