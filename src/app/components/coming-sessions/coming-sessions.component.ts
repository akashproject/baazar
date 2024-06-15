import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coming-sessions',
  templateUrl: './coming-sessions.component.html',
  styleUrl: './coming-sessions.component.scss'
})
export class ComingSessionsComponent implements OnInit{
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
