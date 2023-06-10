import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ItemPage } from '../item/item.page';
import { LocalstorageService } from '../service/localstorage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  role:any;
  id:any
  data: any={}
  public book:any =[];
  public comic:any =[]
  constructor(
    private route : Router,
    private db : LocalstorageService,
    private modalController: ModalController,
    private active:ActivatedRoute
    ) {
      active.params.subscribe(a=>{
        this.ngOnInit()
       })
    }
  form ={
    username : '',
    password : ''
  }
  ngOnInit() {
    this.getbook()
    this.komik()
    console.log(this.comic);
    this.role = window.localStorage.getItem('role');
    // console.log("role: " + this.role);
    
    this.id = this.active.snapshot.paramMap.get('id')
    this.getData()
    
  }

  doAdd(){
    this.route.navigate(['addbook'])
  }

  doLogout(){
    localStorage.clear();
    this.route.navigateByUrl('home')
  }
  doSearch(){
    this.route.navigate(['search'])
  }

  // doItem(data: any) {
  //   this.modalController.create({
  //     component: ItemPage,
  //     componentProps: {
  //       data
  //     }
  //   }).then(a => {
  //     a.present()
  //     a.onDidDismiss().then((a) => {
  //       this.route.navigateByUrl('cart')
  //     });
  //   });
  // }

  async getData(){
    const res = await fetch(`${environment.apiURL}api/show-product`,{
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

  doCart(){
    this.route.navigate(['cart']);
  }

  doTransaction(){
    this.route.navigate(['transaction']);
  }

  doItem(book: any){
    console.log(book);
    
    this.route.navigate([`item/${book}`]);
  }

  ngDestroy(){
    this.doLogout()
  } 
  async getbook(){
    const res = await fetch(environment.apiURL+'api/show-product',{
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
