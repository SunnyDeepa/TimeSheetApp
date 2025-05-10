import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pending-review-timesheet-form',
  templateUrl: './pending-review-timesheet-form.page.html',
  styleUrls: ['./pending-review-timesheet-form.page.scss'],
  standalone:false
})
export class PendingReviewTimesheetFormPage implements OnInit {
  tsRecord

  constructor(private loadingController: LoadingController,
    public router: Router,private toastCtrl: ToastController,public alertController: AlertController) {  

      this.getData()

  }

  ngOnInit() {
  }

  async getData() {

    this.tsRecord = new Tspage()
  }

 async btn_review(){

  const loading = this.loadingController.create({
    mode: 'ios',
    message: 'Please Wait..',
    spinner: 'circles'
  });
  (await loading).present();
 

  this.router.navigateByUrl('pending-review-timesheet-view');
   (await loading).dismiss();
  

  }


  async btn_sendback(){

    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    (await loading).dismiss();
    const alert = await this.alertController.create({
      header: 'Send back comment',
      inputs: [ 
        {
          name: 'commentforlate',
          type: 'text',
          placeholder: 'Comment'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (data1) => {
            console.log(data1.commentforlate);
            if(data1.commentforlate == ""|| typeof data1.commentforlate === 'undefined' ) {
              this.failedAlert();

              } else {
                (await loading).present();
            console.log('Confirm Okay');
           this.router.navigateByUrl('pending-review-timesheet-view');
    
          (await loading).dismiss();
              }
    }}
  ]
    })
    await alert.present();
  }

  async failedAlert() {
    let alert = await this.alertController.create({
      header: 'Please Provide Comment',
    
   // subTitle: text,
    buttons: [{
    text: 'OK',
      handler: () => {
        this.btn_sendback();
      }
    }]
    
    });
    await alert.present();
  }


  async btn_reset_ent(){

    console.log('reset');
    
  }




}


export class Tspage {
  type ='Project'
  project = 'Profactor'
  task = 'Devlepoment for timesheet form'
  category = 'Devlepoment'
  activity = 'Dev'
  started_when = 'Morning'
  desc = 'Devlpoed the new form and create the manager approval parts'
  timeinmin = '360'
  revcomment = ''
  review = '1'
  reviewed = '0'
  correction = '0'

}