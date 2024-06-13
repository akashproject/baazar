import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.scss'
})
export class TrainerComponent implements OnInit {

  public tutors : any = [];
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getTutors();
  }

  getTutors(){
    this.api.get("teachers").subscribe((data: any) => {
      this.tutors = data;
    });
  }

}
