import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ItemPage } from '../item/item.page';
import { LocalstorageService } from '../service/localstorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private route : Router){ }
  form = {
      username : '',
      password : ''
  }

  ngOnInit() {
  }

  doLogout(){
    localStorage.clear();
    this.route.navigateByUrl('home')
  }

  ngDestroy(){
    this.doLogout()
  }

}
