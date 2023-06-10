import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  role: any = [];
  books: any = [];
  total:any = [];
  constructor(
    private route: Router,
    private toastController: ToastController,
    private active: ActivatedRoute
    ) {
      active.params.subscribe(a=>{
        this.ngOnInit()
       })
     }

    totalHarga(){
      for (let book of this.books){
        // book.total_checkout
        console.log(book.total_checkout);
        
      }
      
      
    }

  ngOnInit() {
  this.getCart()
  this.totalHarga()
  this.role = window.localStorage.getItem('role');
  }

  doWelcome(){
    this.route.navigate(['welcome'])
  }

  doSearch(){
    this.route.navigate(['search'])
  }

  doItem(){
    this.route.navigate(['item'])
  }

  doTransaction(id: any){
    this.route.navigate([`transaction/${id}`])
  }

  async delCart(id: any){
    const res = await fetch(`${environment.apiURL}api/user/delete-cart`)
  }

  async getCart(){
    const res = await fetch(`${environment.apiURL}api/show-cart`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization": localStorage.getItem('token') as string
      }
    })
    const data =  await res.json()
    this.books = data.data
    console.log(data);
    
  }

  async getTransaction() {
    try {
      const res = await fetch(`${environment.apiURL}api/user/show-cart`, {
        headers: {
          'Authorization': localStorage.getItem('token') as string
        }
      });
      const json = await res.json();
      console.log(json);
      
      if (res.status !== 200) {
        this.toastController.create({
          message: json.message,
          duration: 2000
        }).then(a => a.present());

        return;
      }

      const listbook = json.data.data.filter((a: any) => a.genre[0].jenis === "Komputer");
      this.books = listbook
    } catch (err) {
      console.log(err)
    }
  }
}
