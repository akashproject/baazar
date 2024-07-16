import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  loader: any;
  isLoading = false;
  details: any;
  private address = new Subject<any>();
  private coupon = new Subject<any>();
  private review = new Subject<any>();
  orders: any;
  private changeLocation = new Subject<any>();
  private loggedIn = new Subject<any>();
  private profile = new Subject<any>();
  private newOrder = new Subject<any>();
  public appPage: any[] = [];
  public appClosedMessage: any = '';
  public popupMessage: any;
  public translations: any[] = [];
  public direction: any;
  public currecny: any;
  public cside: any;
  public selectedCity = new Subject<any>();
  public cartBtn = new Subject<any>();
  public popupRX = new Subject<any>();
  public city: any;
  public stripe: any;
  public stripeCode: any;

  public paypal: any;
  public paypalCode: any;

  public razor: any;
  public razorCode: any;
  public deviceType: any = 'desktop';

  public dummyProducts: any[] = [];
  public favIds: any[] = [];
  public haveFav: boolean | undefined;

  public general: any;

  public twillo: any;
  public logo: any;
  public delivery: any;
  public isEmailVerified: any;
  // public creds = {
  //   sid: '',
  //   token: '',
  //   from: ''
  // }
  public userInfo :any = '';

  constructor(public router: Router) {}

  publishAddress(data: any) {
    this.address.next(data);
  }


  getPopup(): Subject<any> {
    return this.popupRX;
  }

  subscribeCartBtn(): Subject<any> {
    return this.cartBtn;
  }

  // toast(type : any, title : any, msg : any) {
  //   this.toasterService.pop(type, title, msg);
  // }

  subscribeOrder(): Subject<any> {
    return this.newOrder;
  }

  publishReview(data: any) {
    this.review.next(data);
  }

  publishProfile(data: any) {
    this.profile.next(data);
  }

  observProfile(): Subject<any> {
    return this.profile;
  }

  getReviewObservable(): Subject<any> {
    return this.review;
  }

  publishLocation(data : any) {
    this.changeLocation.next(data);
  }
  subscribeLocation(): Subject<any> {
    return this.changeLocation;
  }

  setFav(id : any) {
    this.favIds.push(id);
  }

  removeFav(id : any) {
    this.favIds = this.favIds.filter((x) => x !== id);
  }

  publishLoggedIn(data : any) {
    this.loggedIn.next(data);
  }
  subscribeLoggedIn(): Subject<any> {
    return this.loggedIn;
  }

  publishCity(data : any) {
    this.selectedCity.next(data);
  }

  subscribeCity(): Subject<any> {
    return this.selectedCity;
  }

  getObservable(): Subject<any> {
    return this.address;
  }

  publishCoupon(data: any) {
    this.coupon.next(data);
  }
  getCouponObservable(): Subject<any> {
    return this.coupon;
  }

  setOrders(data : any) {
    this.orders = null;
    this.orders = data;
  }

  getKeys(key : any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        resolve(localStorage.getItem(key));
      } catch (error) {
        reject(error);
      }
    });
  }

  clearKeys(key : any) {
    localStorage.removeItem(key);
  }

  setKeys(key : any, value : any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        resolve(localStorage.setItem(key, value));
      } catch (error) {
        reject(error);
      }
    });
  }

  gerOrder() {
    return this.orders;
  }

  makeid(length : any) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  start() {
    //this.ngxService.start();
  }

  stop() {
    //this.ngxService.stop();
  }

  getString(str : any) {
    if (this.translations[str]) {
      return this.translations[str];
    }
    return str;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    this.userInfo = null;
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
