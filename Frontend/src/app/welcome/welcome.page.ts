import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ItemPage } from '../item/item.page';
import { LocalstorageService } from '../service/localstorage.service';
// import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  public book:any =[];
  public comic:any =[]
  constructor(
    private route : Router,
    private db : LocalstorageService,
    private modalController: ModalController
    ) { }
  form ={
    username : '',
    password : ''
  }
  ngOnInit() {
    this.getbook()
    this.komik()
    console.log(this.comic);
    
  }
  doLogout(){
    localStorage.clear();
    this.route.navigateByUrl('home')
  }
  doSearch(){
    this.route.navigate(['search'])
  }

  doItem(data: any) {
    this.modalController.create({
      component: ItemPage,
      componentProps: {
        data
      }
    }).then(a => {
      a.present()
      a.onDidDismiss().then((a) => {
        this.route.navigateByUrl('cart')
      });
    });
  }

  doCart(){
    this.route.navigate(['cart']);
  }

  doTransaction(){
    this.route.navigate(['transaction']);
  }

  ngDestroy(){
    this.doLogout()
  } 
  async getbook(){
    const res = await fetch(environment.apiURL+'api/user/show-product-user',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
  })

  const data= await res.json()
  console.log(data.data.data)
  this.book=data.data.data

}

  komik(){
    const temp:any={};
    for(const a of this.book){
      if (a.genre === 'Komik'){
        temp.gambar = a;
        temp.judul_buku = a;
        temp.harga_buku = a;
        temp.stok_buku = a;
      }
    }
  }
}
