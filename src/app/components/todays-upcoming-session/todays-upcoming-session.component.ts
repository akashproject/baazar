import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todays-upcoming-session',
  templateUrl: './todays-upcoming-session.component.html',
  styleUrl: './todays-upcoming-session.component.scss'
})
export class TodaysUpcomingSessionComponent {
  public sessions : any = [];
  mediaURL: any = '';
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    public cart: CartService,
    private toastr: ToastrService) {
      this.mediaURL = environment.mediaURL;
    }

    ngOnInit(): void {
      this.getSessions();
    }
  
    getSessions(){
      this.api.get("today-sessions").subscribe((data: any) => {
        this.sessions = data;
      });
    }
}
