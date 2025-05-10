import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, NavController,IonSelect , NavParams, PopoverController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { WebApiService } from 'src/app/services/web-api.service';
import { JsonpClientBackend } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';

import { ProjectListPage } from '../project-list/project-list.page';


@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.page.html',
  styleUrls: ['./timesheet-form.page.scss'],
  standalone:false
})
export class TimesheetFormPage implements OnInit {
     @ViewChild('Type') Type1: IonSelect;
     @ViewChild('Project') Project: IonSelect;
     @ViewChild('task') task: IonSelect;
   @ViewChild('category') category: IonSelect;
   @ViewChild('activity') activity: IonSelect;
   @ViewChild('module') module: IonSelect;
   @ViewChild('functionality') functionality: IonSelect;
   @ViewChild('startedwhen') startedwhen: IonSelect;
  // @ViewChild('category') s2Input;
   @ViewChild('desc') s1Input;
  
  value
  date
  timesheetactivityid
  timesheetid
  Typelist : any[] = [];
  Projectlist
  Tasklist : any[] = [];
  Categorylist : any[] = [];
  Activitylist : any[] = [];
  Modulelist
  Functionalitylist
  Started_Whenlist : any[] = [];
  revcomment
  NewData
  functionalityhide
  Modulehide
  TypeOpt: any = {
    header: 'Type',
  };
  ProjectOpt: any = {
    header: 'Project',
  };
  TaskOpt: any = {
    header: 'Task',
  };
  CategoryOpt: any = {
    header: 'Category',
  };
  ActivityOpt: any = {
    header: 'Activity',
  };
  ModuleOpt: any = {
    header: 'Module',
  };
  FunctionalityOpt: any = {
    header: 'Functionality',
  };
  Started_WhenOpt: any = {
    header: 'Started When',
  };
  nav
  statusid
  mtsentry : any;
  task_completeHide =true
  constructor(private route: ActivatedRoute, private loadingController: LoadingController, public router: Router,
    private toastCtrl: ToastController, private webApi: WebApiService, public navParam: NavParams,
    private modalCtrl: ModalController) {

       this.route.queryParams.subscribe(async params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.tsdata = await this.router.getCurrentNavigation().extras.state
          console.log(this.tsdata);
          this.nav= this.tsdata.nav
          console.log(this.nav);
          
        }
      })
    this.tsRecord = new Tsentry()
    this.mtsentry = this.tsRecord

  }
  async ngOnInit() {
  }

  async ionViewWillEnter () {
    await this.getData();
    await this.getDDData();
    await this.bindData();
    await this.hideeditbutton();
    // await this.Type1.open()
     if ( this.NewData == 'Y') {
     setTimeout(()=>{
      this.Type1.open();
    }, 2);
     }
  }

  async getDDData() {
    if(this.ShowDispData == false || this.tsdata.NewData == 'Y')
    {
      console.log('Dropdown data');
    const params = ''
    await this.webApi.getData("/timesheetservice/gettsmasterlist", params).then(async data => {
      console.log(JSON.stringify(data));
      const returnData: any = await data;
      if (returnData.issucess === 'Y') {
        var Data = JSON.parse(returnData.data)
        this.Typelist = await Data.types

        console.log(this.Typelist);
        this.Projectlist = await Data.project
        console.log(this.Projectlist);

        this.Categorylist = await Data.category
        console.log(this.Categorylist);

        this.Started_Whenlist = await Data.startwhen

      }
      else {
        const errData = returnData.errormessage;
        
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
  else{
      console.log('NO dropdown');
  }
  }

  tsRecord : any;
  tsdata : any;
  async getData() {
        this.mtsentry.date = await this.tsdata.date;
        this.mtsentry.timesheetactivityid= await this.tsdata.timesheetactivityid
        this.mtsentry.timesheetid = await this.tsdata.timesheetid
        this.NewData = await this.tsdata.NewData

    if (this.NewData == 'Y') {
      this.mtsentry.timesheetactivityid = ''
    } else {
      this.mtsentry.timesheetactivityid = this.mtsentry.timesheetactivityid
    }
    const Params = "?timesheetid=" + this.mtsentry.timesheetid + "&timesheetactivityid=" + this.mtsentry.timesheetactivityid + "&date=" + this.mtsentry.date
    console.log((Params));
    await this.webApi.getData("/timesheetservice/gettsentry", Params).then(async data => {
      const returnData: any = await data;
      console.log(returnData);
      
      if (returnData.issucess === 'Y') {
        this.tsRecord = await JSON.parse(returnData.data);
        this.mtsentry = this.tsRecord
      
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
      console.log(JSON.stringify(ex)+'no api');
    })
  }

  async OpenProjectNameSearchpage() {
    const modal = await this.modalCtrl.create({
      component: ProjectListPage,
      cssClass: 'my-custom-class',
      componentProps: {
        typeid: this.mtsentry.typeid
      }
    });
    modal.onWillDismiss().then(async (data) => {
      console.log(data);
      console.log("-------------------------------------------------------");
      const respData = data['data']; // Here's your selected user!
      console.log(respData);
      if (respData != "Back") {
        this.mtsentry.projectid = respData.id
        this.mtsentry.project = respData.val
        this.Modulehide = true
        this.functionalityhide = true
        this.onChangeproject(this.mtsentry.projectid)
        if( this.NewData == 'Y'){
        setTimeout(()=>{
          this.task.open();
        }, 2);
      }
      }
    })
    return await modal.present();
  }

  async onChangeproject(projectid) {

    if(this.ShowDispData == false || this.tsdata.NewData == 'Y')
    {
      console.log('Task Dropdown data1');

    // const categoryId = categoryid;
    console.log(projectid)
    this.loadingController.create();
    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    // const Params = {
    //   categoryid: categoryid
    // };

    const Params = "?projectid=" + projectid
    try {
      await this.webApi.getData('/timesheetservice/tasklist', Params).then(async (data) => {
        (await loading).dismiss();
        const returnData: any = data;
        try {
          if (returnData.issucess === 'Y') {
            var Data = JSON.parse(returnData.data)
            console.log(Data);
            this.Tasklist = await Data
          } else {
            const errData = returnData.errormessage;
            console.log(errData);
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
        } catch (ex) {
          (await loading).dismiss();
          console.log(ex);
        }
      });
    } catch (ex) {
      (await loading).dismiss();
      console.log(ex);
    }
  }else{
    console.log('No Task');
  }
  }

  async onChangecategory(categoryid) {

    if(this.ShowDispData == false)
    {
    for(let i = 0; i<this.Categorylist.length; i++)
    {
      if(categoryid == this.Categorylist[i].id )
      {
       this.mtsentry.categoryid = this.Categorylist[i].id;
       this.mtsentry.category  = this.Categorylist[i].val;
      }
    }
    }

    if(this.ShowDispData == false || this.tsdata.NewData == 'Y')
    {
      console.log('Module Dropdown data1');

    // this.activity.open()
      if(this.NewData == 'Y'){
    setTimeout(()=>{
      this.activity.open();
    }, 2);
  }
    
    console.log(categoryid)
    
    const Params = "?categoryid=" + categoryid
    console.log((Params));
    try {
      await this.webApi.getData('/timesheetservice/gettsactivitylist', Params).then(async (data) => {
       // (await loading).dismiss();
        const returnData: any = data;
        console.log(returnData);
        try {

          if (returnData.issucess === 'Y') {

            var Data = JSON.parse(returnData.data)
            this.Activitylist = await Data

          } else {
            const errData = returnData.errormessage;
            console.log(errData);

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
        } catch (ex) {
         // (await loading).dismiss();
          console.log(ex);
        }
      });
    } catch (ex) {
      //(await loading).dismiss();
      console.log(ex);
    }
  }else{
    console.log('No categore');
    
  }
  }

  async onChangetask(taskid) {
    if(this.ShowDispData == false)
    {
    for(let i = 0; i<this.Tasklist.length; i++)
    {
      if(taskid == this.Tasklist[i].taskid )
      {
       this.mtsentry.taskid = this.Tasklist[i].taskid;
       this.mtsentry.task  = this.Tasklist[i].task;
      }
    }
  }
    console.log(this.mtsentry.taskid);
        if(this.mtsentry.taskid =='-1'){

          this.task_completeHide= false

        }else{
          this.task_completeHide= true
        }

     if(this.NewData == 'Y'){
      setTimeout(()=>{
        this.category.open();
      }, 2);
    }
  }

  // async Modulelist1(projectid) {

  //   if(this.ShowDispData == false || this.tsdata.NewData == 'Y')
  //   {
  //     console.log('Module Dropdown data');

  //   // const categoryId = categoryid;
  //   this.Modulehide = true

  //   console.log(projectid)
  //   this.loadingController.create();
  //   const loading = this.loadingController.create({
  //     mode: 'ios',
  //     message: 'Please Wait..',
  //     spinner: 'circles'
  //   });
  //   (await loading).present();
  //   // const Params = {
  //   //   categoryid: categoryid
  //   // };

  //   const Params = "?projectid=" + projectid
  //   // console.log(JSON.stringify(Params));
  //   console.log((Params));
  //   try {
  //     await this.webApi.getData('/timesheetservice/gettsmodulelist', Params).then(async (data) => {
  //       (await loading).dismiss();

  //       try {
  //         const returnData: any = data;
  //         console.log(returnData);

  //         if (returnData.issucess === 'Y') {

  //           var Data = JSON.parse(returnData.data)
  //           // this.Modulelist = await Data.ProjectModule

  //           this.Modulelist = await Data
  //           console.log(this.Modulelist);

  //         } else {
  //           const errData = returnData.errormessage;
  //           console.log(errData);

  //           let err;
  //           if (errData === null) {
  //             err = returnData.errormessage;
  //           } else if (errData.length === 0) {
  //             err = returnData.errormessage;
  //           } else {
  //             for (let i = 0; i < errData.length; i++) {
  //               err = errData[i].Value;
  //               console.log(err);
  //               break;
  //             }
  //           }
  //           this.showToast(err);
  //         }
  //       } catch (ex) {
  //         (await loading).dismiss();
  //         console.log(ex);
  //       }
  //     });
  //   } catch (ex) {
  //     (await loading).dismiss();
  //     console.log(ex);
  //   }
  // }
  // else{
  //   console.log('no Module');
  // }
  // }

  async onChangeactivity(activityid) {
    if(this.ShowDispData == false)
    {
    for(let i = 0; i<this.Activitylist.length; i++)
    {
      if(activityid == this.Activitylist[i].ActivityId )
      {
       this.mtsentry.activityid = this.Activitylist[i].ActivityId;
       this.mtsentry.activity  = this.Activitylist[i].Activity;
      }
    }
    }

    //  this.startedwhen.open()
    if(this.NewData == 'Y'){
    setTimeout(()=>{
      this.startedwhen.open();
    }, 2);
  }
  }
  async Onchnage_Started_When(started_whenid) {

    if(this.ShowDispData == false)
    {
    for(let i = 0; i<this.Started_Whenlist.length; i++)
    {
      if(started_whenid == this.Started_Whenlist[i].id )
      {
       this.mtsentry.started_whenid = this.Started_Whenlist[i].id;
       this.mtsentry.started_when  = this.Started_Whenlist[i].val;
      }
    }
    }
    //await this.desc.ionFocus
    if( this.NewData == 'Y'){
   this.s1Input.setFocus();
    }
  }

  // async functionlist1(projectid, moduleid) {
  //   if(this.ShowDispData == false || this.tsdata.NewData == 'Y')
  //   {
  //     console.log('Module Dropdown data1');
  //   //  this.functionality.open()
  //   // setTimeout(()=>{
  //   //   this.functionality.open();
  //   // }, 2);
  //   this.functionalityhide = true;

  //   console.log(projectid, moduleid)
  //   this.loadingController.create();
  //   const loading = this.loadingController.create({
  //     mode: 'ios',
  //     message: 'Please Wait..',
  //     spinner: 'circles'
  //   });
  //   (await loading).present();
  //   // const Params = {
  //   //   categoryid: categoryid
  //   // };

  //   const Params = "?moduleid=" + moduleid + "&projectid=" + projectid
  //   // console.log(JSON.stringify(Params));
  //   console.log((Params));
  //   try {
  //     await this.webApi.getData('/timesheetservice/gettsfnlitylist', Params).then(async (data) => {
  //       (await loading).dismiss();

  //       try {
  //         const returnData: any = data;
  //         console.log(returnData);

  //         if (returnData.issucess === 'Y') {
  //           console.log(returnData.data);
  //           this.functionalityhide = true;
  //           var Data = JSON.parse(returnData.data)
  //           console.log(Data);

  //           this.Functionalitylist = await Data
  //           console.log(this.Functionalitylist);

  //         } else {
  //           const errData = returnData.errormessage;
  //           console.log(errData);

  //           let err;
  //           if (errData === null) {
  //             err = returnData.errormessage;
  //           } else if (errData.length === 0) {
  //             err = returnData.errormessage;
  //           } else {
  //             for (let i = 0; i < errData.length; i++) {
  //               err = errData[i].Value;
  //               console.log(err);
  //               break;
  //             }
  //           }
  //           this.showToast(err);
  //         }
  //       } catch (ex) {
  //         (await loading).dismiss();
  //         console.log(ex);
  //       }
  //     });
  //   } catch (ex) {
  //     (await loading).dismiss();
  //     console.log(ex);
  //   }
  // }else{
  //   console.log('No functionlty');
  // }
  // }

 

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  validateFields() {
    if (this.mtsentry.typeid === '' || this.mtsentry.typeid === null || typeof this.mtsentry.typeid === 'undefined') {
      this.showToast('Please Select Type');
      return false;
    }
    if (this.value) {
      if (this.mtsentry.projectid === '' || this.mtsentry.projectid === null || typeof this.mtsentry.projectid === 'undefined') {
        this.showToast('Please Select Project');
        return false;
      }
    }
    if (this.value) {
      if (this.mtsentry.taskid === '' || this.mtsentry.taskid === null || typeof this.mtsentry.taskid === 'undefined') {
        this.showToast('Please Select Task');
        return false;
      }
    }
    if (this.value) {
      if (this.mtsentry.categoryid === '' || this.mtsentry.categoryid === null || typeof this.mtsentry.categoryid === 'undefined') {
        this.showToast('Please Select Category');
        return false;
      }
    }
    if (this.value) {
      if (this.mtsentry.activityid === '' || this.mtsentry.activityid === null || typeof this.mtsentry.activityid === 'undefined') {
        this.showToast('Please Select Activity');
        return false;
      }
    }
    // if (this.Modulehide) {
    //   if (this.mtsentry.moduleid === '' || this.mtsentry.moduleid === null || typeof this.mtsentry.moduleid === 'undefined') {
    //     this.showToast('Please Select Module');
    //     return false;
    //   }
    // }
    // if (this.functionalityhide) {
    //   if (this.mtsentry.Functionalityid === '' || this.mtsentry.Functionalityid === null || typeof this.mtsentry.Functionalityid === 'undefined') {
    //     this.showToast('Please Select Functionality');
    //     return false;
    //   }
    // }
    if (this.mtsentry.started_whenid === '' || this.mtsentry.started_whenid === null || typeof this.mtsentry.started_whenid === 'undefined') {
      this.showToast('Please Select Started When');
      return false;
    }
    if (this.mtsentry.desc === '' || this.mtsentry.desc === null || typeof this.mtsentry.desc === 'undefined') {
      this.showToast('Please Enter Description');
      return false;
    }
    if (this.mtsentry.timeinmin === '' || this.mtsentry.timeinmin === null || typeof this.mtsentry.timeinmin === 'undefined') {
      this.showToast('Please Select Time');
      return false;
    }
    if (this.mtsentry.timeinmin <= 0) {
      this.showToast('Please Enter greater than zero');
      return false;
    }

    return 'Y'
  }
  
  async new_State() {

    if(this.mtsentry.task_complete == null){
      this.mtsentry.task_complete = false
    }

    const state = {
      timesheetid: JSON.parse(this.mtsentry.timesheetid),
      // timesheetid:"R/R88ifYpoU=",
      timesheetactivityid: JSON.parse(this.mtsentry.timesheetactivityid),
      statusid: '0',
      date: this.mtsentry.date,
      typeid: this.mtsentry.typeid,
      projectid: this.mtsentry.projectid,
      taskid: this.mtsentry.taskid,
      task_complete: this.mtsentry.task_complete,
     // task_complete: '1',
      categoryid: this.mtsentry.categoryid,
      activityid: this.mtsentry.activityid,
      moduleid: this.mtsentry.moduleid,
      functionalityid: this.mtsentry.Functionalityid,
      started_wheniD: this.mtsentry.started_whenid,
      desc: this.mtsentry.desc,
      timeinmin: this.mtsentry.timeinmin,
      revcomment: this.mtsentry.revcomment
    }
    return state
  }

  async Existing_State() {

    if(this.mtsentry.task_complete == null){
      this.mtsentry.task_complete = false
    }
    const state = {
      timesheetid: this.mtsentry.timesheetid,
      // timesheetid:"R/R88ifYpoU=",
      timesheetactivityid: this.mtsentry.timesheetactivityid,
      statusid: '0',
      date: this.mtsentry.date,
      typeid: this.mtsentry.typeid,
      projectid: this.mtsentry.projectid,
      taskid: this.mtsentry.taskid,
      task_complete: this.mtsentry.task_complete,
      categoryid: this.mtsentry.categoryid,
      activityid: this.mtsentry.activityid,
      moduleid: this.mtsentry.moduleid,
      functionalityid: this.mtsentry.Functionalityid,
      started_wheniD: this.mtsentry.started_whenid,
      desc: this.mtsentry.desc,
      timeinmin: this.mtsentry.timeinmin,
      revcomment: this.mtsentry.revcomment
    }
    return state
  }

  async btnSave() {
    console.log("save")
    this.loadingController.create();
    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();

    if (this.validateFields() == 'Y') {
      (await loading).dismiss();
      let params
      
      let nav_extra
      if (this.NewData == 'Y') {
        params = await this.new_State()
        // nav_extra = await this.new_nav_extra()
      } else {
        params = await this.Existing_State()
        // nav_extra = await this.Ex_nav_extra()
      }
      console.log(params);
      await this.webApi.PostData("/timesheetservice/savetsentry", params).then(async data => {
        console.log(JSON.stringify(data));

        const returnData: any = await data;

        if (returnData.issucess === 'Y') {
         // this.modalCtrl.dismiss('Submit')
        
         if (this.NewData == 'Y') {
          const navigationExtras: NavigationExtras = {
          state: {
            date: this.mtsentry.date,
            timesheetid: JSON.parse(this.mtsentry.timesheetid),
            NewDate1: 'N'
          }
        };
        console.log(navigationExtras)
        if(this.nav=='H'){
          this.router.navigateByUrl('my-timesheet-list');
          this.showToast('Record Saved Successfully');
        }
        else{
        this.router.navigateByUrl('timesheet-view', navigationExtras);
          // console.log(nav_extra)
          //  this.router.navigateByUrl('timesheet-view', nav_extra);
          this.showToast('Record Saved Successfully');
      } 
        }
      else {
        const navigationExtras: NavigationExtras = {
          state: {
            date: this.mtsentry.date,
            timesheetid: this.mtsentry.timesheetid,
            NewDate1: 'N'
          }
        };
        console.log(navigationExtras)
        if(this.nav=='H'){
          this.router.navigateByUrl('my-timesheet-list');
          this.showToast('Record Saved Successfully');
        }
        else{
        this.router.navigateByUrl('timesheet-view', navigationExtras);
          // console.log(nav_extra)
          //  this.router.navigateByUrl('timesheet-view', nav_extra);
          this.showToast('Record Saved Successfully');
        }
      }

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

    } else {
      (await loading).dismiss();
    }
  }

  async onChangetype(typeid) {

    for(let i = 0; i<this.Typelist.length; i++)
    {
      if(typeid == this.Typelist[i].id )
      {
       this.mtsentry.typeid = this.Typelist[i].id;
       this.mtsentry.type  = this.Typelist[i].val
      }
    }

    if (this.mtsentry.typeid == '20') {
     
      this.value = "20";
      console.log(this.value)

      if ( this.NewData == 'Y') {
        
        await this.OpenProjectNameSearchpage()

      }
    }
    else {
      console.log(this.mtsentry.typeid)
      this.value = "";
      this.Modulehide = false
      this.functionalityhide = false
      // this.startedwhen.open()
      if(this.NewData == 'Y'){
      setTimeout(()=>{
        this.startedwhen.open();
      }, 2);
    }
    }
  }

  async btnGoback() {
   // this.modalCtrl.dismiss('Back')
    this.loadingController.create();
    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    (await loading).dismiss();
    console.log("Go back")
    //  (await loading).dismiss();
    if(this.nav=='H'){
      this.router.navigate(['my-timesheet-list']);
     
    }
    else{
    this.router.navigate(['timesheet-view'])
    }
  }

  HideActivity = false
  Hidefunctionality = false
  HideModule = false

  async bindData() {
    
    this.mtsentry = new Tsentry()
    this.mtsentry = this.tsRecord
    console.log((this.mtsentry))
    //this.mtsentry.task_complete = False
   console.log(this.mtsentry.task_complete);
   
  //   setTimeout(() => {
  //     this.Typelist = this.mtsentry.type;
  //  }, 200);

    if (this.mtsentry.activity == '' || this.mtsentry.activity == null || typeof this.mtsentry.activity == 'undefined') {
      this.HideActivity = true
    }
    if (this.mtsentry.functionality == '' || this.mtsentry.functionality == null || typeof this.mtsentry.functionality == 'undefined') {
      this.Hidefunctionality = true
    }
    // this.mtsentry.moduleid = parseInt(this.mtsentry.moduleid)
    // this.mtsentry.activityid = parseInt(this.mtsentry.activityid)
    //this.mtsentry.functionalityid = parseInt(this.mtsentry.functionalityid)
    
    console.log(this.mtsentry.Functionalityid);
    if (this.mtsentry.categoryid == "" || this.mtsentry.categoryid == null || typeof this.mtsentry.categoryid == "undefined") {
      this.HideCategory = true
    } else {
      await this.onChangecategory(this.mtsentry.categoryid)
    }
    if (this.mtsentry.projectid == "" || this.mtsentry.projectid == null || typeof this.mtsentry.projectid == "undefined") {
      this.HideProject = true
    } else {
      this.Modulehide = true
     // await this.Modulelist1(this.mtsentry.projectid)
    }
    if (this.mtsentry.moduleid == "" || this.mtsentry.moduleid == null || typeof this.mtsentry.moduleid == "undefined") {
      this.HideModule = true
    } else {
      this.functionalityhide = true
      var moduleid = this.mtsentry.moduleid.toString()
      // this.functionlist1(this.mtsentry.projectid, moduleid)
    }
  }

  async getData1(item) {

    const data =item.state
    
        const tsdata =item.state
        this.mtsentry.date = await this.tsdata.date;
        this.mtsentry.timesheetactivityid= await this.tsdata.timesheetactivityid
        this.mtsentry.timesheetid = await this.tsdata.timesheetid
        this.NewData = await this.tsdata.NewData

    if (this.NewData == 'Y') {
      this.mtsentry.timesheetactivityid = ''
    } else {
      this.mtsentry.timesheetactivityid = this.mtsentry.timesheetactivityid
    }
    const Params = "?timesheetid=" + this.mtsentry.timesheetid + "&timesheetactivityid=" + this.mtsentry.timesheetactivityid + "&date=" + this.mtsentry.date
    console.log((Params));
    await this.webApi.getData("/timesheetservice/gettsentry", Params).then(async data => {
    
      const returnData: any = data;
      if (returnData.issucess === 'Y') {
        // this.tsRecord = await JSON.parse(returnData.data);
        this.tsRecord = await JSON.parse(returnData.data);
        this.mtsentry = this.tsRecord
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

  isDisabled = true
  EditButton = true;//changed on 12-jun-20201 as save and Exit button was showing first when not click on edit
  hideedit = false;
  ShowDispData = true;
  async hideeditbutton() {
    
    if (this.mtsentry.status === '' || this.mtsentry.status === null || typeof this.mtsentry.status === 'undefined') {
      console.log(this.mtsentry.statusid + "123")
      this.hideedit = false
      this.EditButton = false

    } else if (this.mtsentry.status === 'Draft' || this.mtsentry.status === 'Correction') {
      //   this.EditButton = false
      this.hideedit = true
     // this.ShowDispData = true
      this.EditButton = true
    }
    else if (this.mtsentry.status === 'Sent For Review') {
     // this.ShowDispData = true
      this.EditButton = true
    }
    else {
      console.log(this.mtsentry.statusid + "123456")
      this.hideedit = false
      // this.EditButton = true
      this.EditButton = true

    }

    if(this.EditButton == true){
      console.log(this.EditButton);
      
      this.ShowDispData = true
    }
    else{
      console.log(this.EditButton);
      this.ShowDispData = false
    
    }
  }
  
 async btnEdit() {

    this.EditButton = false;
    this.isDisabled = false
    this.hideedit = false
    this.ShowDispData = false
    
    const navigationExtras: NavigationExtras = {
    state: {
      date: this.date,
      timesheetactivityid: this.timesheetactivityid,
      timesheetid: this.timesheetid,
      NewData: this.NewData
    }
    };
    await this.getData1(navigationExtras)

    await this.getDDData()
    this.onChangetype(this.mtsentry.typeid)
   
     await this.bindData();
    
  }
  
  HideProject = false
  HideCategory = false

}

export class Tsentry {
  timesheetid
  timesheetactivityid
  statusid
  status
  date
  type
  typeid
  project
  projectid
  taskid
  task
  task_complete 
  category
  categoryid
  activity
  activityid
  module
  moduleid
  functionality
  Functionalityid
  started_when
  started_whenid
  desc
  timeinmin
  revcomment

}

