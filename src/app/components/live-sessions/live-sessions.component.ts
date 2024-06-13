import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrl: './live-sessions.component.scss'
})
export class LiveSessionsComponent implements OnInit {

  public sessions : any = [];


  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getLiveSessions();
  }

  getLiveSessions(){
    this.api.get("live-sessions").subscribe((data: any) => {
      console.log(data);
      
      this.sessions = data;
    });
  }

  
}
