import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public tutors : any = [];
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getLiveSessions();
    this.getTutors();
  }

  getLiveSessions(){
    this.api.get("batches").subscribe((data: any) => {
      console.log(data); 
    });
  }

  getTutors(){
    this.api.get("teachers").subscribe((data: any) => {
      console.log(data.length);
      
      if(data.length !=undefined && data.length > 0){
        for (let i = 0; i < Object.keys(data.data).length; i++) {
          this.tutors.push(data.data[i]);
        }
      }
    });
  }
}
