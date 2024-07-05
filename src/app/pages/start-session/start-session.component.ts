import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router,ActivatedRoute  } from '@angular/router';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-start-session',
  templateUrl: './start-session.component.html',
  styleUrl: './start-session.component.scss'
})
export class StartSessionComponent implements OnInit {
  mediaURL: any = '';
  session : any =[];
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
    console.log(id);
    this.loadLiveStream(id)
  }

  loadLiveStream(id:any){
    this.api.getWithAuth("join-stream/"+id).subscribe((data: any) => {
      this.session = data;
    });
  }

}