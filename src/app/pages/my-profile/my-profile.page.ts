import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { Events } from '../../../assets/Lib/event';
import { StorageService } from 'src/app/services/StorageService/storage.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  standalone:false,
})
export class MyProfilePage implements OnInit {

 userid
  Name;
  EmailId;
  moblieno;
  DOJ
  constructor(private events: Events,private menuCtrl: MenuController,private storage: StorageService,
    private loadingController: LoadingController) { 
    this.menuCtrl.enable(false);
    this.menuCtrl.enable(true);
      this.get()
    }
  ngOnInit(): void {
   
  }

   async get(){
    this.loadingController.create();
    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    (await loading).dismiss();
    this.storage.get('userid').then(
      (data) =>{
        this.userid = data
    })
    this.storage.get('username').then(
        (data) =>{
          this.Name = data
    })
    this.storage.get('emailid').then(
          (data) =>{
            this.EmailId = data
    })
    this.storage.get('moblieno').then(
        (data) =>{
          this.moblieno = data
     })
    this.storage.get('DOJ').then(
      (data) =>{
        this.DOJ = data
    })
    
  }

}
