import {Inject, Injectable } from '@angular/core';
import { UtilService } from './utils.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { switchMap, tap, map} from 'rxjs/operators/index';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  JWT_KEY = 'access_token';

  // localStorage: Storage;

  private user = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

    signinUser(signinUser : {}) {
      return this.http.post(`${environment.apiUrl}login`, { signinUser });
    }

    signupUser(signupUser : {}) {
      return this.http.post(`${environment.apiUrl}signup`, { signupUser });
    }
  
    getCurrentUser() {
      return localStorage.getItem(this.JWT_KEY) || null;
    }
  
    logout(){
      localStorage.removeItem(this.JWT_KEY);
      localStorage.removeItem("login");
      this.user.next(null);
    }
  
    setToken(data : any){
      localStorage.setItem(this.JWT_KEY, data);
    }
  
    setFlag(key:any, value:any){
      localStorage.setItem(key, value);
    }
  
    getFlag(key:any){
      return localStorage.getItem(key) || null;
    }
  
    updateUser(name:string, mobile:string, homestate:string, gender:string, cast:string, city:string, physical_status:string, email:string, neet:string, access_token:string){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      })
  
      return this.http.put(`${environment.apiUrl}/updateprofile`,
        {name: name, mobile:mobile, homestate:homestate, gender : gender, cast: cast, city:city, physical_status:physical_status, email:email, score:neet}, {headers: headers});
  
    }
  
    // signup methods --
  
    sendotp(mobile : string){
      console.log(mobile);
      return this.http.post(`${environment.apiUrl}/send-otp`, {mobile : mobile});
    }
    
  
    uploadPhofilephoto(access_token : string,param: any){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      })
      return this.http.post(`${environment.apiUrl}/upload-profile-photo`, {file : param},{ headers });
    }
  
    loginByGoogle(user_detail:any):any {
      console.log("before post",user_detail.email);

      let loginData : any = {};
      loginData.email = user_detail.email;
      loginData.name = user_detail.name;
      loginData.id = user_detail.id;
      loginData.provider = user_detail.provider;
      loginData.photoUrl = user_detail.photoUrl;
      console.log("before post",loginData);
      return this.http.post(`${environment.apiUrl}/login-by-google`, {loginData});
    }
}
