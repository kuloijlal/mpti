import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { toastController } from '@ionic/core';
import { Method } from 'ionicons/dist/types/stencil-public-runtime';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  message={
    status: "sedang di process",
    color: "warning"
  }
  id: any;
  data: any;

  constructor(
    private route : Router,
    private active: ActivatedRoute,
    private toast: ToastController
    ) { }

    msg(){
      this.message.status="dalam pengiriman"
      this.message.color = "danger"
    }
  ngOnInit() {
    this.id = this.active.snapshot.paramMap.get('id')
    this.getCo()
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

  async done(){
    const res = await fetch(`${environment.apiURL}api/user/delete-cart/${this.id}`,{
    method: "DELETE",
    headers: {
      "Content-Type":"application/json",
      'Authorization': localStorage.getItem('token') as string
    },
  })
  const json = await res.json()
  this.data = json.data
  console.log(this.data);
  this.toast.create({
    message: "Terima kasih, Selamat berbelanja kembali",
    duration: 1000,
    color: 'success'
  })
  .then(a=>{
    a.present()
    this.route.navigate(['welcome'])
  })
}

  async getCo(){
    const res = await fetch(`${environment.apiURL}api/checkout/${this.id}`,{
      method: "GET",
      headers: {
        "Content-Type":"application/json",
        'Authorization': localStorage.getItem('token') as string
      },
  })
  const json = await res.json()
  this.data = json.data
  console.log(this.data);
  
  
}
}
