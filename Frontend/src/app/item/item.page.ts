import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  
  id:any
  data: any={}
  quantity =1;
  constructor(
    private route : Router, 
    private modalController: ModalController, 
    private toastController: ToastController, 
    private active:ActivatedRoute
    ) { }

    doMin(){
      
      if (this.quantity > 1) {
        this.quantity  -= 1
        return
      }

    }
    doPlus(){
      this.quantity += 1;
    }
  ngOnInit() {
    this.id = this.active.snapshot.paramMap.get('id')
    this.getData()
  }

  doWelcome(){
    this.route.navigate(['welcome'])
  }

    doSearch(){
    this.route.navigate(['search'])
  }

  async doCart(){
    console.log('data'+this.data)
    try {
      const res = await fetch(`${environment.apiURL}api/user/checkout/${this.id}`, {
        method: 'POST',
        headers: {
          "Content-Type":"application/json",
          'Authorization': localStorage.getItem('token') as string
        },
        body:JSON.stringify({
          quantity_checkout :this.quantity
        })
      });
      console.log(JSON.stringify(this.quantity));
      
      const json = await res.json();
      console.log(json);
      
      if (json.statusCode !== 200) {
        this.toastController.create({
          message: json.message,
          duration: 2000
        }).then(a => a.present())
        return;
      }

      this.toastController.create({
        message: 'Berhasil masuk ke keranjang',
        duration: 2000
      }).then(a => {
        a.present()
        this.route.navigate(['cart'])
      });

      this.modalController.dismiss();
    } catch (err) {
      console.log(err);
    }
  }

  close() {
    this.route.navigate(['comic'])
  }
  async getData(){
    const res = await fetch(`${environment.apiURL}api/user/show-product/${this.id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization": JSON.stringify(window.localStorage.getItem('token'))
      }
    })
    const data = await res.json()
    this.data = data.data.data
    console.log(this.data);
    
  }
}
