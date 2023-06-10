import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  genre:any;
  constructor(private route : Router) { }

  ngOnInit() {
    this.getGenre()
  }

  async getGenre(){
    const res = await fetch(`${environment.apiURL}api/show-all-jenis`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })

    const data = await res.json()
    console.log(data);
    
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
