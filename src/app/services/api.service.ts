import { Injectable } from '@angular/core';
import { UtilService } from './utils.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: any = '';
  mediaURL: any = '';
  apiUrl: any = '';
  constructor(private http: HttpClient, private util:UtilService) {
    this.baseUrl = environment.baseURL;
    this.mediaURL = environment.mediaURL;
    this.apiUrl = environment.apiUrl;
  }

  getCurrencyCode() {
    return environment.general.code;
  }

  getCurrecySymbol() {
    return environment.general.symbol;
  }

  JSON_to_URLEncoded(element:any, key?: any, list?: any[]) {
    let new_list = list || [];
    if (typeof element === 'object') {
      for (let idx in element) {
        this.JSON_to_URLEncoded(
          element[idx],
          key ? key + '[' + idx + ']' : idx,
          new_list
        );
      }
    } else {
      new_list.push(key + '=' + encodeURIComponent(element));
    }
    return new_list.join('&');
  }

  post(url: any, body: any) {
    let token = 'scriptcrown';
    if(this.util.userInfo) {
      token = this.util.userInfo.token;
    }
    
    const header = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .set('Token', token),
    };
    const param = this.JSON_to_URLEncoded(body);
    return this.http.post(this.apiUrl + url, param, header);
  }

  filepost(url : any, post : any) {
    let token = environment.authToken;
    if(this.util.userInfo) {
      token = this.util.userInfo.token;
    }
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Token', token),
    };
    return this.http.post(
      'https://api.circlepoint.in/index.php/' + url,
      post,
      header
    );
  }

  externalPost(url : any, body : any, key : any) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('X-Api-Key', `Bearer ${key}`),
    };
    const order = this.JSON_to_URLEncoded(body);
    return this.http.post(url, order, header);
  }

  externalPost2(url : any, body : any) {
    const header = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    const order = this.JSON_to_URLEncoded(body);
    return this.http.post(url, order, header);
  }

  instaPay(url : any, body : any, key : any, token : any) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('X-Api-Key', key)
        .set('X-Auth-Token', token),
    };
    const order = this.JSON_to_URLEncoded(body);
    return this.http.post(url, order, header);
  }
  
  get(url : any) {
    let token = environment.authToken;
    if(this.util.userInfo) {
      token = this.util.userInfo.token;
    }
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded'),
        // .set('Token', token),
    };
    return this.http.get(this.apiUrl + url, header);
  }

  externalGet(url : any) {
    return this.http.get(url);
  }

  httpGet(url : any, key : any) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${key}`),
    };

    return this.http.get(url, header);
  }
}
