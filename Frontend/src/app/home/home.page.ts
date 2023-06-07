import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LocalstorageService } from '../service/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  showPassword: boolean = false;

  form ={
    username : '',
    password : ''
  }
  constructor(
    private route : Router,
    private alert : AlertController,
    private toast:ToastController,
    private db:LocalstorageService
    ) { }

  async doLogin(){

    const res = await fetch(environment.apiURL+'api/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email: this.form.username,
        password: this.form.password
      })
    })
    const data = await res.json()
    console.log(data);

    if (data.statusCode!==200){
      this.alert.create({
        message:"Email atau password salah!",
        buttons:["OK"]
      }).then(a=>a.present())

      return
    }
    this.toast.create({
      message:"Berhasil Login",
      duration:1000
    }).then(a=>{
      a.present()
      localStorage.setItem('token',data.token);
      localStorage.setItem('role',data.role);
      if(data.role === 'user'){
      this.route.navigateByUrl('welcome')
    }
    return this.route.navigateByUrl('welcome')
    })



  }

  doRegister(){
    this.route.navigate(['register'])
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
