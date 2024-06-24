import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router,ActivatedRoute  } from '@angular/router';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-trainer-bio',
  templateUrl: './trainer-bio.component.html',
  styleUrl: './trainer-bio.component.scss'
})
export class TrainerBioComponent implements OnInit{
  mediaURL: any = '';
  public tutor : any;
  public sessions : any = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    public util: UtilService,
    public cart: CartService,
    private toastr: ToastrService) {
      this.mediaURL = environment.mediaURL;
    }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.getTutor(id)
    this.getSessionByTrainer(id)
  }

  getTutor(id:any){
    this.api.get("teacher/"+id).subscribe((data: any) => {
      this.tutor = data;
    });
  }

  getSessionByTrainer(id:any){
    this.api.get("get-trainer-sessions/"+id).subscribe((data: any) => {
      this.sessions = data;
    });
  }
  
}  

