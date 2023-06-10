import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LocalstorageService } from '../service/localstorage.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.page.html',
  styleUrls: ['./addbook.page.scss'],
})
export class AddbookPage implements OnInit {
  form:any={}
  img:any;
  isi:any;
  constructor(
    private route : Router,
    private alert : AlertController,
    private toast: ToastController,
    private db:LocalstorageService
  ) { }

  ngOnInit() {
  }

  async doTambah(){
    const formData = new FormData()
    formData.append("judul_buku", this.form.judul_buku)
    formData.append("id_jenis", this.form.book)
    formData.append("gambar", this.img)
    formData.append("stok_buku", this.form.stok_buku)
    formData.append("harga_buku", this.form.harga_buku)
    formData.append("sinopsis_buku", this.form.sinopsis_buku)
    formData.append("email", this.form.email)

    const res = await fetch(`${environment.apiURL}api/admin/create-buku`,{
      method:'POST',
      headers:{
        "Authorization": JSON.stringify( this.db.get('token'))
      },
      body: formData
    })

    console.log(typeof JSON.stringify( this.db.get('token')));
    
    console.log(formData.get('gambar'));
    
    const data = await res.json()
    console.log(data);

    if (data.data.statusCode!==200){
      this.alert.create({
        message:"Gagal menambah buku !",
        buttons:["OK"]
      }).then(a=>a.present())

      return
    }
    this.toast.create({
      message:"Berhasil menambah buku",
      duration:1000
    }).then(a=>{
      a.present()
      this.route.navigate(['welcome'])
    })
  }

  doWelcome(){
    this.route.navigate(['welcome'])
  }

  handleChange(ev:any) {
    this.form.book = ev.target.value;
  }

  loadImage(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = ()=>{
      // this.picture = reader.result;
      this.form.gambar = reader.result;
      this.img = file;
    }

    reader.onerror = (error)=>{
      console.log(error);
    }
  }

}
