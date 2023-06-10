import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  
  role:any;
  id:any
  data: any={}
  quantity =1;
  constructor(
    private route : Router, 
    private modalController: ModalController, 
    private toastController: ToastController, 
    private active:ActivatedRoute,
    private alert: AlertController
    ) {
       active.params.subscribe(a=>{
        this.ngOnInit()
       })
    }

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
    this.role = window.localStorage.getItem('role');
    // console.log("role: " + this.role);
    
    this.id = this.active.snapshot.paramMap.get('id')
    console.log(this.id);
    
    this.getData()
  }

  doWelcome(){
    this.route.navigate(['welcome'])
  }

    doSearch(){
    this.route.navigate(['search'])
  }

  doDel(){
    this.alert.create({
      message: "Apakah yakin ingin menghapus buku ?",
      buttons: [{
        text: "Oke",
        role: "oke",
        handler: he=>{
          this.del(this.id)
        }
      },
    {
      text:"Batal",
        role: "batal"
      
    }]
    }).then((a)=>{
      a.present()
    })
  }

  async del(id:any){
    const res = await fetch(`${environment.apiURL}api/admin/delete-buku/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type":"application/json",
        'Authorization': localStorage.getItem('token') as string
      },
    })

    const json = await res.json();
    this.route.navigate(['welcome']);
    console.log(json);

    if (json.statusCode !== 200) {
      this.toastController.create({
        message: json.message,
        duration: 2000
      }).then(a => a.present())
      return;
  }
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
        message: 'Berhasil beli',
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
    window.history.back()
  }

  async getData(){
    const res = await fetch(`${environment.apiURL}api/show-product/${this.id}`,{
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
