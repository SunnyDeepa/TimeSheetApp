import { Component, NgZone, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { AlertController, LoadingController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { WebApiService } from 'src/app/services/web-api.service';

@Component({
  selector: 'app-my-timesheet-list',
  templateUrl: './my-timesheet-list.page.html',
  styleUrls: ['./my-timesheet-list.page.scss'],
  standalone:false,
})
export class MyTimesheetListPage implements OnInit {

 
  Data
  Year
  DateSelection
  SelectedMonth
  SelectedYear
  monthdata
  disStrttime: boolean = false
  date
  Cap_latter
  tsentry
  startTime
  endTime
  Totaltime
  Totaltime1: any = 0
  status
  statusid
  timesheetid
  timesheetactivityid
  NewRc
  tsentrylength
  cp: number = 1;
  constructor(private menuCtrl: MenuController, private loadingController: LoadingController,
    private modalcontroller: ModalController,private ngzone: NgZone,
    public router: Router, private webApi: WebApiService, private toastCtrl: ToastController,
    public alertController: AlertController) {
    // this.menuCtrl.enable(true);

    var date = new Date()
    var month = ("0" + (date.getMonth() + 1)).slice(-2)
    var year = date.getFullYear();
    var currdate = ("0" + (date.getDate())).slice(-2);
    this.DateSelection = year + "-" + month + "-" + currdate
    this.SelectedMonth = this.DateSelection
    this.SelectedYear = this.DateSelection
    console.log(this.DateSelection);
    
    this.getDashboard(this.DateSelection)

   }

   async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

 
  // async ionViewDidEnter() {
  //   this.ngzone.run(
  //     () => {  this.getDashboard(this.DateSelection); 
  //       })
  // }

  ngOnInit() {
    }


  MonthDatalength
  

  async getDashboard(DateSelection) {
    
    // console.log(this.SelectedMonth + "" + this.SelectedYear);
    var dateMonth = new Date(DateSelection)
    var MonthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var Month = MonthArr[dateMonth.getMonth()]
    var dateYear = new Date(DateSelection)
    var Year = dateYear.getFullYear()
    const changeDateFormat = Month + "-" + Year
    console.log(JSON.stringify(changeDateFormat));
    const Params = "?month=" + changeDateFormat
    console.log(JSON.stringify(Params));
    var events = [];
    await this.webApi.getData("/timesheetservice/gettscalview", Params).then(async data => {
      const returnData: any = await data

      if (returnData.issucess === 'Y') {
        this.Data = JSON.parse(returnData.data)
        console.log(this.Data);
        let mData = JSON.parse(returnData.data)
        this.monthdata = mData.monthdata
        this.MonthDatalength = this.monthdata.length
        console.log(this.monthdata);
       
      //   newDate = new Date()
      // const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
      // const year = newDate.getFullYear();
      // const date = ("0" + newDate.getDate()).slice(-2);
      // const changeDateFormat = year + "-" + month + "-" + date
      // console.log(changeDateFormat)


        let  NewDate
        for (let i = 0; i < this.Data.monthdata.length; i++) {
          console.log(this.Data.monthdata[i].statusid);
          console.log(this.Data.monthdata[i].date);
          const newDate1 = new Date(this.Data.monthdata[i].date)
          const month = ("0" + (newDate1.getMonth() + 1)).slice(-2);
          const year = newDate1.getFullYear();
          const date = ("0" + newDate1.getDate()).slice(-2);
          const changeDateFormat1 = year + "-" + month + "-" + date
          this.timesheetid = ''
          if (changeDateFormat1 == DateSelection) {
            this.timesheetid = this.Data.monthdata[i].timesheetid
            NewDate = 'N'
            break;
          }
          else {
            console.log('Failed');
            NewDate = 'Y'
          }

        }

        if (this.timesheetid == undefined) {
          this.timesheetid = ''
        }
        else {
          this.timesheetid = this.timesheetid
        }
        console.log(this.timesheetid );
        
        this.date =  DateSelection
        // this.timesheetid = this.monthdata.timesheetid
        this.NewRc = NewDate
        const Params = "?timesheetid=" + this.timesheetid + "&date=" + this.date
        console.log(JSON.stringify(Params));
        await this.webApi.getData("/timesheetservice/gettimesheet", Params).then(async data => {
          console.log(JSON.stringify(data));
          const returnData: any = await data;
          if (returnData.issucess === 'Y') {
    
            var Data = JSON.parse(returnData.data)
            console.log(JSON.stringify(Data) + '11');
    
            this.status = Data.status
            this.statusid = await JSON.parse(Data.statusid)
            this.startTime = Data.starttime
            this.startTime1 = Data.starttime
            this.endTime = Data.endtime;
            this.endTime1 = Data.endtime
            this.timesheetid = await JSON.stringify(Data.timesheetid)
            console.log('we');
          
            // if(this.NewRc=='Y') 
            // {
            // this.Waring()
            // }else{}
            this.Totaltime1 = 0
            this.tsentry = JSON.parse(Data.tsentry)
            // this.tsentrylength = await JSON.parse(this.tsentry.length)
             console.log(JSON.stringify(this.tsentry.length));
            
            // for (let i = 0; i < this.tsentry.length; i++) {
            //   if (this.tsentry[i].project > 0) {
    
            //   } else {
            //     this.tsentry[i].Cap_latter = (this.tsentry[i].project).substring(0, 1)
    
            //   }
            // }
    
            // this.Totaltime1 = 0
            for (let i = 0; i < this.tsentry.length; i++) {          
              this.tsentry[i].Totaltime = (this.tsentry[i].timeinmin)
              this.Totaltime1 = parseInt(this.Totaltime1) + parseInt(this.tsentry[i].Totaltime)
              
            }
    
          } else {
    
            console.log("login fail");
            this.showToast(returnData.errormessage);
          }
        }).catch(ex => {
          console.log(JSON.stringify(ex));
        })
      

      } else {

        console.log("No data");
        this.showToast(returnData.errormessage);
      }
    })
  }


  async Waring() {
    let alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: ' Warnning!!!',
      message:'You are not filling daily timesheet Make sure fill timesheet daily basis or it will affect your annual performance.',
   // subTitle: text,
    buttons: [{
    text: 'OK',
      handler: () => {
      }
    }]
    
    });
    await alert.present();
  }


  async btnNew_form(NewData, item) {
    this.loadingController.create();
    const loading =await this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    try {
      
      if(this.startTime1 ===  null || typeof this.startTime1 === 'undefined' )
      {
        this.showToast('Please Provide Punch In Time.');
        (await loading).dismiss();
      }else{
     
      (await loading).dismiss();
     
      if (item == '') {
        this.timesheetactivityid = item
      }
      else {
        this.timesheetactivityid = item.timesheetactivityid
      }
      
      const navigationExtras: NavigationExtras = {
        state: {
          date: this.date,
          timesheetactivityid: this.timesheetactivityid,
          timesheetid: this.timesheetid,
          NewData: NewData,
          nav:'H'
        }

      };
      console.log(navigationExtras);
      this.router.navigateByUrl('timesheet-form', navigationExtras)
      // console.log(this.date);
      // console.log(this.timesheetid);
      // console.log(NewData);
      // console.log(this.timesheetactivityid);

      // const ModalForm = await this.modalCtrl.create({
      //   component: TimesheetFormPage,
      //   componentProps: {
      //     date: this.date,
      //     timesheetactivityid: this.timesheetactivityid,
      //     timesheetid: this.timesheetid,
      //     NewData: NewData
      //   }
      // });
      // ModalForm.onDidDismiss()
      //   .then((data) => {
      //     console.log("-------------------------------------------------------");
      //     const RespData = data['data']; // Here's your selected user!
      //     console.log(RespData);
      //     if (RespData == "Submit") {
      //       console.log(this.timesheetid);
      //       this.timesheetid = JSON.parse(this.timesheetid)
      //       console.log(this.timesheetid);
      //       this.getData()
      //     }
      //   });
      // return await ModalForm.present();
    }} catch (ex) {
      console.log(ex);
      (await loading).dismiss();
    }
  }

 commentforlate =''
 startTime1
 endTime1

  async btnPunchIn()
  {
    
    if (Date.parse(this.startTime) >= Date.parse(this.endTime)) {
      console.log('validation')
      this.showToast('Punch In time should be less then Punch Out time.');
      return false;
    } else
    if (this.startTime === '' || this.startTime === null || typeof this.startTime === 'undefined') {
      console.log('validation')
      this.showToast('Please Provide Punch In time.');
      return false;
    }else{
    //  console.log(stdateFormat);
        // console.log(this.startTime);
              
        // console.log(this.NewRc);
        // if (typeof this.NewRc == 'undefined' || this.NewRc == 'Y') {
        //     let d = this.startTime.split('T')[1];
        //     let m = d.split(':')[0];
        //     let n = d.split(':')[1];
        //      var AmOrPm = m >= 12 ? 'pm' : 'am';
        //        // m = (m % 12) || 12;
        //       this.startTime1 = m + ":" + n //+ " " + AmOrPm;
        //    console.log(this.startTime1);
   
        //   }
            // else 
             if (this.startTime.length >5) {
               
               let d = this.startTime.split('T')[1];
               let m = d.split(':')[0];
               let n = d.split(':')[1];
                var AmOrPm = m >= 12 ? 'pm' : 'am';
                // m = (m % 12) || 12;
               this.startTime1 = m + ":" + n //+ " " + AmOrPm;
               console.log(this.startTime1);
               this.Alertpunchin()
              }
              else {
                
                if(this.endTime !== '')
                {
                 if (this.startTime >= this.endTime) {
                  console.log('validation')
                  this.showToast('Punch In time should be less then Punch Out time.');
                  return false;
                } 
                else{
                  this.startTime1 = this.startTime
                 
                  this.Alertpunchin()
                  
                }
              }else{

                this.startTime1 = this.startTime
                  
                  this.Alertpunchin()
              }
              }
                console.log(this.timesheetid);
                // this.Alertpunchin()
         }

  }
  async failedAlert(text) {
    let alert = await this.alertController.create({
      header: 'Please Provide Comment',
    
   // subTitle: text,
    buttons: [{
    text: 'OK',
      handler: () => {
        this.Alertpunchin();
      }
    }]
    
    });
    await alert.present();
  }

 async Alertpunchin(){

  if(this.startTime1 >"10:15")
  {
const alert = await this.alertController.create({
 cssClass: 'alertCancel' ,
 header: 'Reason for late Punch In',
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
			this.failedAlert("username is required");
		  } else {
			  
       console.log('Confirm Ok');
      //this.commentforlate(data1.Month)
      this.commentforlate=data1.commentforlate
      // this.startTime1 = this.startTime
      
      //await this.Alertpunchin()
    

    const Params = "?timesheetid=" + JSON.parse(this.timesheetid) + "&punchin=" + this.startTime1 + "&commentforlate=" + this.commentforlate
   
    console.log(Params);
    
await this.webApi.getData("/timesheetservice/savepunchin", Params).then(async data => {

const returnData: any = await data;
console.log(returnData);

if (returnData.issucess === 'Y') {
// this.modalCtrl.dismiss('Save punchin')
// this.router.navigateByUrl('dashboard')
this.showToast('Punch In Submitted Successfully');
this.startTime = this.startTime1


} else {
const errData = returnData.errormessage;
let err;
if (errData === null) {
err = returnData.errormessage;
} else if (errData.length === 0) {
err = returnData.errormessage;
} else {
for (let i = 0; i < errData.length; i++) {
  err = errData[i].Value;
  console.log(err);
  break;
}
}
this.showToast(err);
}

}).catch(ex => {
console.log(JSON.stringify(ex));
})
      
}}
}
]
});

await alert.present();
}
else{
this.commentforlate=''
const Params = "?timesheetid=" + JSON.parse(this.timesheetid) + "&punchin=" + this.startTime1 + "&commentforlate=" + this.commentforlate
   
    console.log(Params);
    
await this.webApi.getData("/timesheetservice/savepunchin", Params).then(async data => {

const returnData: any = await data;
console.log(returnData);

if (returnData.issucess === 'Y') {
// this.modalCtrl.dismiss('Save punchin')
// this.router.navigateByUrl('dashboard')
this.showToast('Punch In Submitted Successfully');
} else {
const errData = returnData.errormessage;
let err;
if (errData === null) {
err = returnData.errormessage;
} else if (errData.length === 0) {
err = returnData.errormessage;
} else {
for (let i = 0; i < errData.length; i++) {
  err = errData[i].Value;
  console.log(err);
  break;
}
}
this.showToast(err);
}
}).catch(ex => {
console.log(JSON.stringify(ex));
})}
}


  async btnPunchOut()
  {
    
    if (Date.parse(this.startTime) >= Date.parse(this.endTime)) {
      console.log('validation')
      this.showToast('Punch Out time should be greater then Punch In time.');
      return false;
    } else
    if (this.endTime === '' || this.endTime === null || typeof this.endTime === 'undefined') {
      console.log('validation')
      this.showToast('Please Provide Punch out time.');
      return false;
    }else{
              
       var startTime
       var endTime
        // console.log(this.NewRc);
        // if (typeof this.NewRc == 'undefined'|| this.NewRc == 'Y') {
        //     let d = this.endTime.split('T')[1];
        //     let m = d.split(':')[0];
        //     let n = d.split(':')[1];
        //      var AmOrPm = m >= 12 ? 'pm' : 'am';
        //        // m = (m % 12) || 12;
        //        this.endTime1 = m + ":" + n //+ " " + AmOrPm;
        //    console.log(this.endTime1);
   
        //   }else 
        if (this.endTime.length >5) {
          
          let d = this.endTime.split('T')[1];
          let m = d.split(':')[0];
          let n = d.split(':')[1];
           var AmOrPm = m >= 12 ? 'pm' : 'am';
           // m = (m % 12) || 12;
          this.endTime1 = m + ":" + n //+ " " + AmOrPm;
          console.log(this.endTime1);
          this.Alertpunchout()
         }
         else {
           
           if (this.startTime >= this.endTime) {
             console.log('validation')
             this.showToast('Punch Out time should be greater then Punch In time.');
             return false;
           } 
           else{
             this.endTime1 = this.endTime
             
             this.Alertpunchout()
             
           }
              // await this.Alertpunchin()
   
             
         }
           console.log(this.timesheetid);
           // this.Alertpunchin()
    }

}

diff
commentforlateout = ''

async Alertpunchout()
{
  
  var timestamp1 = new Date(this.startTime1).getTime();
  var timestamp2 = new Date(this.endTime1).getTime();
  console.log(timestamp1);
  
   this.diff = timestamp2 - timestamp1
 
  let PunchoutPromot
if(this.diff >=36000002 )
{
  PunchoutPromot = '1'
  
} else if(isNaN(this.diff))
{
  let d1 = this.startTime1
  let m1 = d1.split(':')[0];
  let n1 = d1.split(':')[1];
  
  let d2 = this.endTime1
  let m2 = d2.split(':')[0];
  let n2 = d2.split(':')[1];
  let c= m2-m1
  let d=n2-n1
  console.log(c);
  console.log(d);
  let e=c+':'+d
  console.log(e);
  if(c==10)
  {
    if(d>0)
    {
      PunchoutPromot = '1'
    }
    else{
      PunchoutPromot = '0'
    }
  }else if(c>10)
  {
    PunchoutPromot = '1'
  }
  else{
     PunchoutPromot = '0'
  }
  }else{
  PunchoutPromot = '0'
  console.log(PunchoutPromot);
  
}

if(PunchoutPromot == '1')
{
const alert = await this.alertController.create({
cssClass: 'alertCancel' ,
header: 'Reason for late Punch out',
inputs: [ 
{
name: 'name1',
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
  
  console.log('Confirm Ok');
 //this.commentforlate(data1.Month)
 this.commentforlateout=data1.name1
 // this.startTime1 = this.startTime

 //await this.Alertpunchin()

const Params = "?timesheetid=" + JSON.parse(this.timesheetid) + "&punchout=" + this.endTime1 + "&commentforlate=" + this.commentforlateout

console.log(Params);

await this.webApi.getData("/timesheetservice/savepunchout", Params).then(async data => {

const returnData: any = await data;
console.log(returnData);

if (returnData.issucess === 'Y') {
// this.modalCtrl.dismiss('Save punchin')
// this.router.navigateByUrl('dashboard')
this.showToast('Punch Out Submitted Successfully');
this.endTime = this.endTime1

} else {
const errData = returnData.errormessage;
let err;
if (errData === null) {
err = returnData.errormessage;
} else if (errData.length === 0) {
err = returnData.errormessage;
} else {
for (let i = 0; i < errData.length; i++) {
err = errData[i].Value;
console.log(err);
break;
}
}
this.showToast(err);
}

}).catch(ex => {
console.log(JSON.stringify(ex));
})
 
}}

]
});

await alert.present();
}
else{
this.commentforlateout=''
const Params = "?timesheetid=" + JSON.parse(this.timesheetid) + "&punchout=" + this.endTime1 + "&commentforlate=" + this.commentforlateout

console.log(Params);

await this.webApi.getData("/timesheetservice/savepunchout", Params).then(async data => {
console.log((data));
const returnData: any = await data;

if (returnData.issucess === 'Y') {
// this.modalCtrl.dismiss('Save punchin')
// this.router.navigateByUrl('dashboard')
this.showToast('Punch Out Submitted Successfully');
} else {
const errData = returnData.errormessage;
let err;
if (errData === null) {
err = returnData.errormessage;
} else if (errData.length === 0) {
err = returnData.errormessage;
} else {
for (let i = 0; i < errData.length; i++) {
err = errData[i].Value;
console.log(err);
break;
}
}
this.showToast(err);
}
}).catch(ex => {
console.log(JSON.stringify(ex));
})}
}


  async btnSubmit_TS() {
    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to submit the timesheet?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: async () => {
            
            console.log('Confirm Okay');
            (await loading).present();
            (await loading).dismiss();
            if (Date.parse(this.startTime) >= Date.parse(this.endTime)) {
              console.log('validation')
              this.showToast('Punch Out time should be greater then Punch In time.');
              return false;
            }else if (this.startTime === '' || this.startTime === null || typeof this.startTime === 'undefined') {
              console.log('validation')
              this.showToast('Please Provide Punch In time.');
              return false;
            }else if (this.endTime === '' || this.endTime === null || typeof this.endTime === 'undefined') {
              console.log('validation')
              this.showToast('Please Provide Punch Out time.');
              return false;
            } else if(this.tsentry === null){
              this.showToast('Please add Activity details.');
            } 
            else {

              var startTime
              var endTime
              console.log(this.NewRc);
              if (typeof this.NewRc == 'undefined'|| this.NewRc == 'Y') {
                let d = this.startTime.split('T')[1];
                let m = d.split(':')[0];
                let n = d.split(':')[1];
                var AmOrPm = m >= 12 ? 'pm' : 'am';
                // m = (m % 12) || 12;
                startTime = m + ":" + n //+ " " + AmOrPm;
                
                //  var etdateFormat = this.endTime.split('T')[0];
                //  console.log(etdateFormat);
                let d1 = this.endTime.split('T')[1];
                let m1 = d1.split(':')[0];
                let n1 = d.split(':')[1];
                var AmOrPm = m1 >= 12 ? 'pm' : 'am';
                // m = (m1 % 12) || 12;
                endTime = m1 + ":" + n1 //+ " " + AmOrPm;
                console.log(endTime);
              }
              else if (this.startTime.length >5) {
                let d = this.startTime.split('T')[1];
                let m = d.split(':')[0];
                let n = d.split(':')[1];
                var AmOrPm = m >= 12 ? 'pm' : 'am';
                // m = (m % 12) || 12;
                startTime = m + ":" + n //+ " " + AmOrPm;
                console.log(startTime);
                //  var etdateFormat = this.endTime.split('T')[0];
                //  console.log(etdateFormat);
                let d1 = this.endTime.split('T')[1];
                let m1 = d1.split(':')[0];
                let n1 = d.split(':')[1];
                var AmOrPm = m1 >= 12 ? 'pm' : 'am';
                // m = (m1 % 12) || 12;
                endTime = m1 + ":" + n1 //+ " " + AmOrPm;
                console.log(endTime);
              }
              else {
                if (this.startTime >= this.endTime) {
                  console.log('validation')
                  this.showToast('Punch Out time should be greater then Punch In time.');
                  return false;
                } 
                else{
                var startTime = this.startTime
                var endTime = this.endTime
                }
              }
             
              // const navigationExtras: NavigationExtras = {
              var state = {
                timesheetid: JSON.parse(this.timesheetid),
                statusid: '1',
                date: this.date,
                starttime: startTime,
                endtime: endTime
              }
              // };
              // const Params =navigationExtras.state
              const Params = state

              // const P=JSON.parse(Params.timesheetid)

              console.log(Params);

              await this.webApi.PostData("/timesheetservice/submitts", Params).then(async data => {
                console.log((data));
                const returnData: any = await data;
               
                if (returnData.issucess === 'Y') {
                 // this.modalCtrl.dismiss('Submit')
                   this.router.navigateByUrl('dashboard')
                  this.showToast('Record Submitted Successfully');
                } else {
                  const errData = returnData.errormessage;
                  let err;
                  if (errData === null) {
                    err = returnData.errormessage;
                  } else if (errData.length === 0) {
                    err = returnData.errormessage;
                  } else {
                    for (let i = 0; i < errData.length; i++) {
                      err = errData[i].Value;
                      console.log(err);
                      break;
                    }
                  }
                  this.showToast(err);
                }

              }).catch(ex => {
                console.log(JSON.stringify(ex));
              })
            }
          }
        }]
    });
    await alert.present();

  }

  async Delect_Tc(item) {

    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    (await loading).dismiss();
    if (item == '') {
      this.timesheetactivityid = item
    }
    else {
      this.timesheetactivityid = item.timesheetactivityid
    }

    var state = {
      timesheetactivityid: this.timesheetactivityid,
    }

    const Params = "?timesheetactivityid=" + this.timesheetactivityid
    console.log(JSON.stringify(Params));
    await this.webApi.getData("/timesheetservice/deletetimesheetact", Params).then(async data => {
      console.log(JSON.stringify(data));
      const returnData: any = await data;
      
      if (returnData.issucess === 'Y') {
        this.timesheetid = JSON.parse(this.timesheetid)
        const navigationExtras: NavigationExtras = {
          state: {
            date: this.date,
            timesheetid: this.timesheetid,
            NewDate1: this.NewRc
          }
        };
        console.log(navigationExtras)
    
       // this.router.navigateByUrl('timesheet-view',navigationExtras);
        // this.getData1(navigationExtras)
        this.getDashboard(this.DateSelection)
        this.showToast('Record deleted Successfully');

      } else {
        const errData = returnData.errormessage;
        let err;
        if (errData === null) {
          err = returnData.errormessage;
        } else if (errData.length === 0) {
          err = returnData.errormessage;
        } else {
          for (let i = 0; i < errData.length; i++) {
            err = errData[i].Value;
            console.log(err);
            break;
          }
        }
        this.showToast(err);
      }
    }).catch(ex => {
      console.log(JSON.stringify(ex));
    })
  }
 
  async getData1(item) {

       const data =item.state
        console.log(data);
        this.date = data.date
        this.NewRc = data.NewDate1
        const newDate = new Date(data.date)
        const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
        const year = newDate.getFullYear();
        const date = ("0" + newDate.getDate()).slice(-2);
        const changeDateFormat = year + "-" + month + "-" + date
        this.timesheetid = data.timesheetid
        
    const Params = "?timesheetid=" + this.timesheetid + "&date=" + data.date
    console.log(JSON.stringify(Params));
    await this.webApi.getData("/timesheetservice/gettimesheet", Params).then(async data => {
      console.log(JSON.stringify(data));
      const returnData: any = await data;
     

      if (returnData.issucess === 'Y') {

        var Data = JSON.parse(returnData.data)
        console.log(JSON.stringify(Data) + '11');

        this.status = Data.status
        this.statusid = await JSON.parse(Data.statusid)
        this.startTime = Data.starttime
        this.startTime1 = Data.starttime
        this.endTime = Data.endtime;
        this.endTime1 = Data.endtime
        this.timesheetid = await JSON.stringify(Data.timesheetid)
        
        this.tsentry = JSON.parse(Data.tsentry)

        for (let i = 0; i < this.tsentry.length; i++) {
          if (this.tsentry[i].project > 0) {

          } else {
            this.tsentry[i].Cap_latter = (this.tsentry[i].project).substring(0, 1)

          }
        }

        this.Totaltime1 = 0
        for (let i = 0; i < this.tsentry.length; i++) {
          
          this.tsentry[i].Totaltime = (this.tsentry[i].timeinmin)
          this.Totaltime1 = parseInt(this.Totaltime1) + parseInt(this.tsentry[i].Totaltime)
          
        }

      } else {

        console.log("login fail");
        this.showToast(returnData.errormessage);
      }
    }).catch(ex => {
      console.log(JSON.stringify(ex));
    })
  }


  EditButton = false;
  async hideeditbutton() {
    console.log(this.statusid)
    if (this.status === "Sent For Review" ||this.status === "Reviewed" ||this.status === "Reviewed With Discrepancy") {
      
      this.EditButton = true
      this.disStrttime = true
    } else if (this.status === "Correction")
    {
      
      this.EditButton = false
      this.disStrttime = true
    }
     else {
      
      this.EditButton = false
      this.disStrttime = false
    }
  }

  async ionViewDidEnter() {
    this.ngzone.run(
      () => {  this.getDashboard(this.DateSelection); 
        })
    this.menuCtrl.enable(true);
    await this.hideeditbutton();
  }

  
  Back() {
    this.modalcontroller.dismiss('Back')
  }
}

export class Tsentry {
  loginid
  password
  iemi
  deviceid
  model
  manufacturur
  timesheetid
  timesheetactvityid
}







