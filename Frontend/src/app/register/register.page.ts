import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { LocalstorageService } from '../service/localstorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  showPassword: boolean = false;


  form ={
    username : '',
    password : '',
    email : '',
    confirmation_password : ''
  }
  constructor(
    private route : Router, 
    private alert: AlertController,
    private toast:ToastController,
    private db:LocalstorageService
    ) { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  close() {
    window.history.back()
  }

  async doRegister(){

    const res = await fetch(environment.apiURL+'api/register',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        nama_user: this.form.username,
        email: this.form.email,
        password: this.form.password,
        confirmation_password : this.form.confirmation_password,
      })
    })
    const data = await res.json()
    console.log(data);

    if (data.data.statusCode!==200){
      this.alert.create({
        message:"Gagal Regis",
        buttons:["OK"]
      }).then(a=>a.present())

      return
    }
    this.toast.create({
      message:"Berhasil Daftar",
      duration:1000
    }).then(a=>{
      a.present()
      this.db.set('token', data.token)
      this.route.navigateByUrl('home')
    })



  }
}
