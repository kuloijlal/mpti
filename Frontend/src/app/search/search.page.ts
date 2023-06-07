import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private route : Router) { }

  ngOnInit() {
  }

  doWelcome(){
    this.route.navigate(['welcome'])
  }
  onSearchChange(event: any){}

  doCart(){
    this.route.navigate(['cart']);
  }

  doTransaction(){
    this.route.navigate(['transaction']);
  }
  doSearch(){
    this.route.navigate(['search']);
  }

  doComic(){
    this.route.navigate(['comic']);
  }

  doPolitic(){
    this.route.navigate(['politic']);
  }

  doCartoon(){
    this.route.navigate(['cartoon']);
  }

  doKamus(){
    this.route.navigate(['kamus']);
  }

  doBisnis(){
    this.route.navigate(['bisnis']);
  }
  
}
