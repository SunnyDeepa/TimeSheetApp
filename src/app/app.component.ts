import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { WebApiService } from './services/web-api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [];
  constructor(private router: Router, private loadingController: LoadingController,
    private menuCtrl: MenuController, private webApi: WebApiService, private toastCtrl: ToastController,
    private storage: Storage) {
        this.menuCtrl.enable(false);
  }
  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async Profile() {
    
    this.loadingController.create();
    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    (await loading).dismiss();
    console.log("profile")
    this.menuCtrl.close();
    this.router.navigateByUrl('/my-profile')

  }
  async Logout() {
   
    this.loadingController.create();
    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    (await loading).dismiss();
    const param = ''
    console.log(JSON.stringify(param));

    await this.webApi.getData("/auth/logout", param).then(async data => {
      const returnData: any = await data
      console.log(returnData)
      if (returnData.issucess === 'Y') {
        // this.menuCtrl.close()
      
        console.log("Logout")
        await this.storage.set('userToken','');
        this.storage.set("userid", '')
        this.storage.set("username", '')
        this.storage.set("emailid", '')
        this.storage.set("moblieno", '')
        this.storage.set("DOJ", '')

        this.router.navigateByUrl('/login')
        this.menuCtrl.enable(false);
      } else {
        console.log("No data");
        this.showToast(returnData.errormessage);
      }
    })
  }
  
  async My_task(){
    
    this.loadingController.create();
    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    (await loading).dismiss();
    console.log("profile")
    this.menuCtrl.close();
    this.router.navigateByUrl('/my-task')

  }
  async Pending_review(){
   
    this.loadingController.create();
    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    (await loading).dismiss();
    console.log("profile")
    this.menuCtrl.close();
    this.router.navigateByUrl('/pending-my-review')

  }

  async Home(){
    
    this.loadingController.create();
    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    (await loading).dismiss();
    console.log("profile")
    this.menuCtrl.close();
    this.router.navigateByUrl('/my-timesheet-list')

  }

  async My_timesheet_task1(){
    
    this.loadingController.create();
    const loading = await this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    (await loading).dismiss();
    console.log("timesheet list")
    this.menuCtrl.close();
    this.router.navigateByUrl('/my-timesheet-list')

  }
  async My_timesheet_task(){
    
    this.loadingController.create();
    const loading =await this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    (await loading).dismiss();
    console.log("profile")
    this.menuCtrl.close();
    this.router.navigateByUrl('/dashboard')

  }
}
