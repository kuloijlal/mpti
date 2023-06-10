import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-kamus',
  templateUrl: './kamus.page.html',
  styleUrls: ['./kamus.page.scss'],
})
export class KamusPage implements OnInit {
  books: any = [];

  constructor(
    private route: Router,
    private toastController: ToastController
    ) { }

  ngOnInit(
  ) {
    this.getKamus();
  }
  doSearch(){
    this.route.navigate(['search']);
  }

  doWelcome(){
    this.route.navigate(['welcome']);
  }

  doTransaction(){
    this.route.navigate(['transaction']);
  }

  doItem(book: any){
    this.route.navigate(['item']);
  }

  doCart(){
    this.route.navigate(['cart']);
  }

  async getKamus() {
    try {
      const res = await fetch(`${environment.apiURL}api/show-product-jenis`, {
        headers: {
          'Authorization': localStorage.getItem('token') as string
        }
      });
      const json = await res.json();
      if (res.status !== 200) {
        this.toastController.create({
          message: json.message,
          duration: 2000
        }).then(a => a.present());

        return;
      }
      const listbook = json.data.data.filter((a: any) => a.genre[0].jenis === "Kamus");
      this.books = listbook
    } catch (err) {
      console.log(err)
    }
  }
}
