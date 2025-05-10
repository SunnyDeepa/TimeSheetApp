import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/StorageService/storage.service';
import { WebApiService } from 'src/app/services/web-api.service';
import { Events } from 'src/assets/Lib/event';
// import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {


  constructor(private router: Router, private nav: NavController, private menuCtrl: MenuController,  private platform: Platform, 
    private webApi:WebApiService,public loadingController: LoadingController, private storage: StorageService,
    private toastCtrl: ToastController,private events: Events) {
      this.menuCtrl.enable(false);
 
  }
  LoginId;
  Password;
  Userinfo
  mLoginData
  ngOnInit() {  

  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  async Login() {
    await this.bindData();
    if (this.Validate() === true) {
      const param = await this.bindData();
      console.log('Login Params:', JSON.stringify(param));
  
      const loading = this.loadingController.create({
        mode: 'ios',
        message: 'Please Wait..',
        spinner: 'circles'
      });
      (await loading).present();
  
      this.webApi.PostloginData(param, '/auth/login').then(async data => {
        console.log('API Response:', JSON.stringify(data));  // Log response
  
        (await loading).dismiss();
        const returnData: any = data;  // Use the returned data
  
        console.log('Parsed Response:', returnData);
  
        if (returnData.issucess === 'Y') {
          console.log('Login Success');
          console.log('AuthToken:', returnData.AuthToken);
          await this.storage.set('userToken', returnData.usertoken);
          this.storage.set("userid", returnData.userid);
          this.storage.set("username", returnData.username);
          this.storage.set("emailid", returnData.emailid);
          this.storage.set("moblieno", returnData.moblieno);
          this.storage.set("DOJ", returnData.DOJ);
          this.menuCtrl.enable(true);
          this.router.navigateByUrl('/my-timesheet-list');
        } else {
          console.log('Login Failed');
          (await loading).dismiss();
          this.showToast('Invalid Login Id and Password');
        }
      }).catch(ex => {
        console.log('Error in API Call:',ex);
      });
    } else {
      let errMSG = this.Validate();  // Validate error message
    }
  }
  
async bindData()
{
this.mLoginData = new loginData()
console.log(this.mLoginData)

this.mLoginData.username =this.LoginId,
this.mLoginData.pass  = this.Password,
this.mLoginData.UUID= "12345678",
this.mLoginData.Model= "Test",
this.mLoginData.platform= "virtual",
this.mLoginData.serial= "123434",
this.mLoginData.version= "9",
this.mLoginData.manufacturer= "android"
return this.mLoginData
}

Validate(){

if(this.mLoginData.username === ''|| this.mLoginData.username === null || typeof this.mLoginData.username === 'undefined')
{
  this.showToast('Please enter Login Id');
      return false;
}
if(this.mLoginData.pass === ''|| this.mLoginData.pass === null || typeof this.mLoginData.pass === 'undefined')
{
  this.showToast('Please enter Password');
  return false;
}
return true
  }
}

export class loginData
{
  loginid
  password 
  iemi
  deviceid
  model
  manufacturur
}