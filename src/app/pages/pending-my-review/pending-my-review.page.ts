import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pending-my-review',
  templateUrl: './pending-my-review.page.html',
  styleUrls: ['./pending-my-review.page.scss'],
  standalone:false,
})
export class PendingMyReviewPage implements OnInit {

  constructor(private menuCtrl: MenuController,private loadingController: LoadingController,
    public router: Router,private toastCtrl: ToastController) { 
    this.menuCtrl.enable(false);
    this.menuCtrl.enable(true);

    this.Get_member()
   
  }
  Member
  user
  Pendingdatalength = ''
  Pendingdata
  ngOnInit() {
  }


 async Get_member(){
      this.Member = [
      {
        id: "1",
        Name:"Rahul Maurya"
      },
      {
        id: "2",
        Name:"Mohammed Nedariya"
      },
      {
        id: "3",
        Name:"Akshay Poojari"
      },
      {
        id: "4",
        Name:"Swapnil Sarwankar"
      }
    ]

  }

  onChangeUser(user){
    console.log( user);
    this.user = user
    console.log(this.user);
    
  if( this.user==2){
    this.Pendingdata = [
      {
        timesheetid: "1",
        date: "02-Jun-2021",
        activity:"3",
        status:"Sent For Review",
        timeinmin:"30",
      },
      {
        timesheetid: "2",
        date: "03-Jun-2021",
        activity:"1",
        status:"Correction",
        timeinmin:"120",
      },
      {
        timesheetid: "3",
        date: "07-Jun-2021",
        activity:"2",
        status:"Sent For Review",
        timeinmin:"230",
      },
      {
        timesheetid: "4",
        date: "12-Jun-2021",
        activity:"4",
        status:"Reviewed",
        timeinmin:"300",
      }
    ]
    this.Pendingdatalength = this.Pendingdata.length

  }else{
    
    this.Pendingdata= []
    console.log(this.Pendingdata.length);
    
    this.Pendingdatalength = this.Pendingdata.length

  }

  }

async btnonTimeSelected(items) {
    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    console.log(items);
    
    const navigationExtras: NavigationExtras = {
      state: {
        date: "02-jun-2021",
        timesheetid: '1',
        
      }
    };
    console.log(navigationExtras)

    this.router.navigateByUrl('pending-review-timesheet-view', navigationExtras);
     (await loading).dismiss();
    
 
  };







}
