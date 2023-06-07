import { Component, OnInit, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {
  role: any;
  path: any;

  constructor(
    private route : Router,
    private active:ActivatedRoute
    )
   { active.params.subscribe(a=>{
    this.ngOnInit()
   })}

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.path = this.route.url;
    this.role = this.getRole();
    console.log(this.path);
  }

  // admin only
  doCart(){
    this.route.navigate(['cart']);
  }

  doTransaction(){
    this.route.navigate(['transaction']);
  }

  doSettings(){
    this.route.navigate(['settings']);
  }


  // user only
  doTransactionUser() {
    this.route.navigate(['/user/transaction']);
  }

  doCartUser(){
    this.route.navigate(['/user/cart']);
  }

  getRole() {
    return localStorage.getItem('role');
  }

}