import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { WebApiService } from 'src/app/services/web-api.service';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.page.html',
  styleUrls: ['./my-task.page.scss'],
  standalone:false,
})
export class MyTaskPage implements OnInit {

  constructor(private menuCtrl: MenuController, private loadingController: LoadingController,  
    public router: Router, private route: ActivatedRoute, private toastCtrl: ToastController,
    private webApi: WebApiService) {
    this.menuCtrl.enable(false);
    this.menuCtrl.enable(true);
    this.getdata()
   }
   ngOnInit() {
  }

   data
   taskid
   data_length
   async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async ionViewDidEnter() {
    await this.getdata()
  }

  async getdata(){
    // const loading = this.loadingController.create({
    //   mode: 'ios',
    //   message: 'Please Wait..',
    //   spinner: 'circles'
    // });
    // (await loading).present();
    // (await loading).dismiss();

    // this.data4 = [
    //   {
    //     project:"Bluezon-profactor",
    //     task_title: 'Testing new module',
    //     start_date:'20 May 2021',
    //     end_date: "22 May 2021",
    //     priority: "High",
    //     est_time: "120",
    //     uti_time: "150",
    //     task_com:"1"
    //   },
    //   {
    //     project:"E&Y - PAS Mobility Phase",
    //     task_title: 'Create new form',
    //     start_date:'23 May 2021',
    //     end_date: "24 May 2021",
    //     priority: "Medium",
    //     est_time: "250",
    //     uti_time: "150",
    //     task_com: "0"
    //   },
    //   {
    //     project:"PNG - I Zoom +",
    //     task_title: 'Meeting',
    //     start_date:'20 May 2021',
    //     end_date: "21 May 2021",
    //     priority: "Low",
    //     est_time: "30",
    //     uti_time: "40",
    //     task_com:"1"
    //   },
    //   {
    //     project:"ICICI - HRMS",
    //     task_title: 'Demo',
    //     start_date:'28 May 2021',
    //     end_date: "28 May 2021",
    //     priority: "High",
    //     est_time: "120",
    //     uti_time: "150",
    //     task_com:"0"
    //   },
    // ]

    console.log('Dropdown data');
    const params = ''
    await this.webApi.getData("/timesheetservice/gettasklist", params).then(async data => {
      console.log(JSON.stringify(data));

      const returnData: any = await data;
      console.log(returnData);

      if (returnData.issucess === 'Y') {
        this.data = JSON.parse(returnData.data)
        
        console.log(JSON.stringify(this.data) );
        this.data_length = this.data.length
        console.log(this.data_length);
        
      }
      else {
        const errData = returnData.errormessage;
        console.log('12');

        let err;
        if (errData === null) {
          err = returnData.ErrorMessage;
        } else if (errData.length === 0) {
          err = returnData.ErrorMessage;
        } else {
          // tslint:disable-next-line:prefer-for-of
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

   async Task_form(item){

    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    try {

      (await loading).dismiss();
      this.taskid = item.taskid
      console.log(this.taskid);
      const navigationExtras: NavigationExtras = {
        state: {
          taskid: JSON.parse(this.taskid)
        }
      };
      console.log(navigationExtras)
      this.router.navigateByUrl('my-task-form', navigationExtras)
     // this.router.navigateByUrl('my-task-form')
      
    } catch (ex) {
      console.log(ex);
      (await loading).dismiss();
    }
   }

   async btnSubmit_task(item){

    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    try {

      const Params =  item.taskid

              // const P=JSON.parse(Params.timesheetid)

              console.log(Params);

              await this.webApi.PostData("/timesheetservice/markascomplete?taskid="+item.taskid, Params).then(async data => {
                console.log((data));
                const returnData: any = await data;
                console.log(returnData);

                if (returnData.issucess === 'Y') {
                 // this.modalCtrl.dismiss('Submit')
                   this.getdata()
                  //this.router.navigateByUrl('my-task')
                  this.showToast('Task completed Successfully');
                  (await loading).dismiss();
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
                  (await loading).dismiss();
                  
                }
              }).catch( async ex => {
                console.log(JSON.stringify(ex));
                (await loading).dismiss();
                
              })
      //this.router.navigateByUrl('my-task-form')
      // this.showToast('Task completed Successfully');
      // (await loading).dismiss();

    } catch (ex) {
      console.log(ex);
      (await loading).dismiss();
    }
   }

  
}
