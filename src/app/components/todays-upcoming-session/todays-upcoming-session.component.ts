import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
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
    private toastr: ToastrService) {
      this.mediaURL = environment.mediaURL;
    }

    ngOnInit(): void {
      this.getLiveSessions();
    }
  
    getLiveSessions(){
      this.api.get("upcoming-sessions").subscribe((data: any) => {
        this.sessions = data;
      });
    }
}
