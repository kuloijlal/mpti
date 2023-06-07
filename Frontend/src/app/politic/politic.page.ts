import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-politic',
  templateUrl: './politic.page.html',
  styleUrls: ['./politic.page.scss'],
})
export class PoliticPage implements OnInit {
  books: any = [];

  constructor(
    private route : Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getPolitic();
  }

  doSearch(){
    this.route.navigate(['search'])
  }

  doWelcome(){
    this.route.navigate(['welcome'])
  }

  doTransaction(){
    this.route.navigate(['transaction']);
  }

  doItem(book: any){
    this.route.navigate([`item/${book}`]);
  }

  doCart(){
    this.route.navigate(['cart']);
  }
  
  async getPolitic() {
    try {
      const res = await fetch(`${environment.apiURL}api/user/show-product-user`, {
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
      const listbook = json.data.data.filter((a: any) => a.genre[0].jenis === "Novel");
      this.books = listbook
      console.log(this.books);
    } catch (err) {
      console.log(err)
    }
  }
}

