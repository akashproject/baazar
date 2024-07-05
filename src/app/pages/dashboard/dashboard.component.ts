import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public liveSessions : any = [];
  public previousSessions : any = [];
  public nextSessions : any = [];
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
    this.getPreviousSessions();
    this.getUpcomingSessions();
  }

  getLiveSessions(){
    this.api.getWithAuth("live-purchased-sessions").subscribe((data: any) => {
      this.liveSessions = data;
    });
  }

  getPreviousSessions(){
    this.api.getWithAuth("past-purchased-sessions").subscribe((data: any) => {
      this.previousSessions = data;
    });
  }

  getUpcomingSessions(){
    this.api.getWithAuth("upcoming-purchased-sessions").subscribe((data: any) => {
      this.nextSessions = data;
    });
  }

  joinStreamNow(id:any) {
    id = window.btoa(id);
    this.router.navigate([]).then(result => {  window.open('/start-session/'+id, '_blank'); });;
  }
}
