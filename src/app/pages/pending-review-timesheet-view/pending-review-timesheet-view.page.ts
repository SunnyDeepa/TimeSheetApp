import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pending-review-timesheet-view',
  templateUrl: './pending-review-timesheet-view.page.html',
  styleUrls: ['./pending-review-timesheet-view.page.scss'],
  standalone:false,
})
export class PendingReviewTimesheetViewPage implements OnInit {
  tsentry
  Totaltime
  date
  name
  btnHide = true
  constructor( private loadingController: LoadingController,public alertController: AlertController,
    public router: Router,private toastCtrl: ToastController) { 
    this.getdate()

  }

  ngOnInit() {
  }

  async getdate(){
    this.date = '02-06-2021'
    //this.Totaltime1 = '480'
    this.name = 'Mohammed Nedariya'
    this.tsentry = [
    {
      timesheetactvityid: "1",
      project:"Pas",
      toplevel:"Project",
      desc: "Devloped timesheet",
      revcomment:"review",
      timeinmin:"120",
      review:"1",
      reviewed:"0",
      correction:"0"
    },
    {
      timesheetactvityid: "2",
      project:"Profactor",
      toplevel:"Project",
      desc: "Testing data",
      revcomment:"",
      timeinmin:"180",
      review:"0",
      reviewed:"1",
      correction:"0"
    },
    {
      timesheetactvityid: "3",
      project:"",
      toplevel:"No work",
      desc: "Devloped timesheet",
      revcomment:"review",
      timeinmin:"60",
      review:"1",
      reviewed:"0",
      correction:"0"
    },
    {
      timesheetactvityid: "4",
      project:"Pas",
      toplevel:"Project",
      desc: "Devloped timesheet",
      revcomment:"review",
      timeinmin:"30",
      review:"0",
      reviewed:"1",
      correction:"0"
    }
  ]

  this.Totaltime = 0
  for (let i = 0; i < this.tsentry.length; i++) {          
    this.tsentry[i].Totaltime = (this.tsentry[i].timeinmin)
    this.Totaltime = parseInt(this.Totaltime) + parseInt(this.tsentry[i].Totaltime)
    
  }

  for (let i = 0; i < this.tsentry.length; i++) { 
  
    if(this.tsentry[i].correction =='1'){
      this.btnHide = false
      break
    }else{
      this.btnHide = true
    }

  }

}

async btn_Review_ent(item){

console.log('review' +item.timesheetactvityid);


}

async btn_form(item){

  const loading = this.loadingController.create({
    mode: 'ios',
    message: 'Please Wait..',
    spinner: 'circles'
  });
  (await loading).present();
  console.log(item);
  
  const navigationExtras: NavigationExtras = {
    state: {
      date: "02-jun-2021",
      timesheetid: '1',
      
    }
  };
  console.log(navigationExtras)

  this.router.navigateByUrl('pending-review-timesheet-form', navigationExtras);
   (await loading).dismiss();
  

}

async btn_Review_TS(desc){
  const loading = this.loadingController.create({
    mode: 'ios',
    message: 'Please Wait..',
    spinner: 'circles'
  });
  (await loading).present();
  (await loading).dismiss();
    console.log(desc);
if(desc=='desc'){

  const alert = await this.alertController.create({
    header: 'Discrepancy',
    inputs: [ 
      {
        name: 'comment',
        type: 'text',
        placeholder: 'Enter Comment'
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
          console.log(data1.comment);
          if(data1.comment == ""|| typeof data1.comment === 'undefined' ) {
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
else{
  console.log('no desc');
  
}

}

async failedAlert() {
  let alert = await this.alertController.create({
    header: 'Please Provide Comment',
  
 // subTitle: text,
  buttons: [{
  text: 'OK',
    handler: () => {
      this.btn_Review_TS('desc');
    }
  }]
  
  });
  await alert.present();
}

async btn_Back_TS(){

  const loading = this.loadingController.create({
    mode: 'ios',
    message: 'Please Wait..',
    spinner: 'circles'
  });
  (await loading).present();
  (await loading).dismiss();
  const alert = await this.alertController.create({
    header: 'Send back For Correction',
    inputs: [ 
      {
        name: 'sendbackcomment',
        type: 'text',
        placeholder: 'Enter Comment'
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
          console.log(data1.sendbackcomment);
          if(data1.sendbackcomment == ""|| typeof data1.sendbackcomment === 'undefined' ) {
            this.failedAlert_back();

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

async failedAlert_back() {
  let alert = await this.alertController.create({
    header: 'Please Provide Comment',
  
 // subTitle: text,
  buttons: [{
  text: 'OK',
    handler: () => {
      this.btn_Back_TS();
    }
  }]
  
  });
  await alert.present();
}

btn_reset_ent(item){

  console.log('reset');
  
}




}
