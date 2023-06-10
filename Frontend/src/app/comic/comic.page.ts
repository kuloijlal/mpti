import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-comic',
  templateUrl: './comic.page.html',
  styleUrls: ['./comic.page.scss'],
})
export class ComicPage implements OnInit {
  books: any = [];

  constructor(
    private route: Router,
    private toastController: ToastController,
    ) { }

  ngOnInit(
  ) {
    this.getComic();
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
    console.log(book);
    
    this.route.navigate([`item/${book}`]);
  }

  doCart(){
    this.route.navigate(['cart']);
  }

  async getComic() {
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
      const listbook = json.data.data.filter((a: any) => a.genre[0].jenis === "Komik");
      this.books = listbook
      console.log(this.books);
      
    } catch (err) {
      console.log(err)
    }
  }
}
