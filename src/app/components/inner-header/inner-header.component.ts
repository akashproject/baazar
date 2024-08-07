import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-inner-header',
  templateUrl: './inner-header.component.html',
  styleUrl: './inner-header.component.scss'
})
export class InnerHeaderComponent implements OnInit {
  public user : any = (localStorage.getItem('user') === null)?localStorage.getItem('user'):JSON.parse(localStorage.getItem('user') || '{}');
  public token : any = (localStorage.getItem('access_token') === null)?localStorage.getItem('access_token'):JSON.parse(localStorage.getItem('access_token') || '{}');
  cartCount: any;
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    public cart: CartService,
    private toastr: ToastrService) {
        
 
    }

    ngOnInit(): void {
      this.cartCount = this.cart.cart.cartItemCount;
    }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    this.util.userInfo = null;
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }


}
