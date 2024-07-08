import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiService  } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  allSettings :any =  (localStorage.getItem('allSettings') !== null)?JSON.parse(localStorage.getItem('allSettings') || '{}'):null;
  constructor(private api: ApiService) {
      
  }


  ngOnInit(): void {
    this.getAllSettings()
  }

  getAllSettings(){
    if (this.allSettings == null) {
      this.api.get("all-settings").subscribe((data: any) => {
         localStorage.setItem("allSettings",JSON.stringify(data))
      });
    }
  }
}
