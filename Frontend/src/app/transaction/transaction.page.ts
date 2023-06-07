import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  constructor(private route : Router) { }

  ngOnInit() {
  }
  doWelcome(){
    this.route.navigate(['welcome'])
  }

  doSearch(){
    this.route.navigate(['search'])
  }

  doCart(){
    this.route.navigate(['cart'])
  }
  
}
