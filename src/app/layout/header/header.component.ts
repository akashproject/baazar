import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public user : any = (localStorage.getItem('user') === null)?localStorage.getItem('user'):JSON.parse(localStorage.getItem('user') || '{}');
  public token : any = (localStorage.getItem('access_token') !== null)?JSON.parse(localStorage.getItem('access_token') || '{}'):null;
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService) {
        
        
    }

  ngOnInit(): void {

  }

  logout() {
    localStorage.clear();
    this.util.userInfo = null;
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }


}
