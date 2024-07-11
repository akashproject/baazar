import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
  allSettings :any = {

  };

  ngOnInit(): void {
    this.allSettings =  (localStorage.getItem('allSettings') !== null)?JSON.parse(localStorage.getItem('allSettings') || '{}'):null
  }

}
