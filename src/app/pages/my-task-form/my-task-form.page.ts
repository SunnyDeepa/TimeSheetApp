import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { WebApiService } from 'src/app/services/web-api.service';

@Component({
  selector: 'app-my-task-form',
  templateUrl: './my-task-form.page.html',
  styleUrls: ['./my-task-form.page.scss'],
  standalone:false,
})
export class MyTaskFormPage implements OnInit {

  tsRecord
  task
  constructor(private loadingController: LoadingController,  
    public router: Router, private route: ActivatedRoute, private toastCtrl: ToastController,
    private webApi: WebApiService) { 
      this.tsRecord = new Tspage()
      this.getData()

    }

   
    
    async showToast(msg) {
      const toast = await this.toastCtrl.create({
        message: msg,
        duration: 3000
      });
      toast.present();
    }

  async btnSubmit_task(){

    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    try {

      const Params = ""

              // const P=JSON.parse(Params.timesheetid)

              console.log(Params);

              await this.webApi.PostData("/timesheetservice/markascomplete?taskid="+this.tsRecord.taskid, Params).then(async data => {
                console.log((data));
                const returnData: any = await data;
                console.log(returnData);

                if (returnData.issucess === 'Y') {
                 // this.modalCtrl.dismiss('Submit')
                   
                  this.router.navigateByUrl('my-task')
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

    } catch (ex) {
      console.log(ex);
      (await loading).dismiss();
    }
   }
   
 async getData() {
 
  await this.route.queryParams.subscribe(async params => {
      
    if (this.router.getCurrentNavigation().extras.state) {
      this.task = await this.router.getCurrentNavigation().extras.state
      this.tsRecord.taskid = JSON.parse(this.task.taskid)
      console.log(this.tsRecord.taskid);

      const Params = "?taskid=" + JSON.stringify(this.tsRecord.taskid)
      console.log(Params);
      await this.webApi.getData("/timesheetservice/gettaskentry", Params).then(async data => {
        console.log(JSON.stringify(data) + '1');
        const returnData: any = data;
        if (returnData.issucess === 'Y') {
          // this.tsRecord = await JSON.parse(returnData.data);
          this.tsRecord = await JSON.parse(returnData.data);
          
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
    }})

 }


  ngOnInit() {
  }

}
export class Tspage {

taskid
project
projectid
task_title
start_date
end_date
des
priority
est_time
uti_time
task_com

}