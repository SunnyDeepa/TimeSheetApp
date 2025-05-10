import { Component, NgZone, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, LoadingController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { WebApiService } from 'src/app/services/web-api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  eventSource=[]
  viewTitle
  timesheetid
  statusid
  Data
  Year
  markDisabled
  DateSelection
  SelectedMonth
  SelectedYear
  monthdata=[]
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  }
  events = []
  cp: number = 1;

  minDate: String = new Date().toISOString();
  constructor(private menuCtrl: MenuController, private loadingController: LoadingController,
    public router: Router, private webApi: WebApiService, private ngzone: NgZone, private toastCtrl: ToastController,
    public alertController: AlertController) {
    this.menuCtrl.enable(true);
    var date = new Date()
    var month = ("0" + (date.getMonth() + 1)).slice(-2)
    var year = date.getFullYear();
    var currdate = ("0" + (date.getDate())).slice(-2);
    this.DateSelection = year + "-" + month + "-" + currdate
    this.SelectedMonth = this.DateSelection
    this.SelectedYear = this.DateSelection
    console.log(this.DateSelection);
  }
  loadEvents(monthdata) {
    
    monthdata = [{
      date: '2021-10-04',
      color:'#15317E',
      status:'0'

    },
    {
      date: '2021-10-03',
      color:'#7BCCB5',
      status:'1'

    },
    {
      date: '2021-10-01',
      color:'#347C2C',
      status:'2'

    }]
    for (var i = 0; i < monthdata.length; i++) {
      var date = new Date(monthdata[i].date);
    var startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    var endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    console.log(monthdata[i].status);
    
    if(monthdata[i].status == "0"){
    this.events.push({
      title: 'test',
      startTime: startTime,
      endTime: endTime,
      allDay: false,
      eventColor: 'red'
    });
  }
  else if(monthdata[i].status == "2"){
    this.events.push({
      title: 'test',
      startTime: startTime,
      endTime: endTime,
      allDay: false,
      eventColor: 'Purple'
    });
  }
  else{
    this.events.push({
      title: 'test',
      startTime: startTime,
      endTime: endTime,
      allDay: false,
      eventColor: 'black'
    });
  }
  
  }

  }
  async onCurrentDateChanged(ev: Date) {
    console.log('Currently viewed date: ' + ev);
    alert(2)

    var date = ev
    var month = ("0" + (date.getMonth() + 1)).slice(-2)
    var year = date.getFullYear();
    var currdate = ("0" + (date.getDate())).slice(-2);
    this.DateSelection = year + "-" + month + "-" + currdate
    this.SelectedMonth = this.DateSelection
    this.SelectedYear = this.DateSelection
    console.log(this.DateSelection);
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.ngzone.run(
      () => {  this.getDashboard(this.DateSelection); 
        })
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }


  MonthDatalength
  async btnonTimeSelected(items) {
    console.log(items);

    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();

    let selectedTime = new Date()

    const t = new Date()
    console.log(JSON.stringify(t));
    const month2 = ("0" + (t.getMonth() + 1)).slice(-2);
    const year2 = t.getFullYear();
    const date2 = ("0" + t.getDate()).slice(-2);
    const changeDateFormat2 = year2 + "-" + month2 + "-" + date2
    console.log(changeDateFormat2)
    const iteam1 = new Date(items.date)

    const month3 = ("0" + (iteam1.getMonth() + 1)).slice(-2);
    const year3 = iteam1.getFullYear();
    const date3 = ("0" + iteam1.getDate()).slice(-2);
    const changeDateFormat3 = year3 + "-" + month3 + "-" + date3
    console.log(changeDateFormat3);

    if (changeDateFormat2 >= items || changeDateFormat2 >= changeDateFormat3) {
      console.log('high');

      let newDate1
      let state = items.date
      console.log(state);

      let newDate
      if (items.date == '' || typeof items.date === 'undefined') {

        newDate1 = new Date(items)
        console.log(newDate1);
        // newDate1.setDate(newDate1.getDate() + 1)
        await this.getDashboard(this.DateSelection)

      } else {
        console.log('iteam data');
        newDate1 = items.date
      }
      console.log(newDate1);
      newDate = new Date(newDate1)
      const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
      const year = newDate.getFullYear();
      const date = ("0" + newDate.getDate()).slice(-2);
      const changeDateFormat = year + "-" + month + "-" + date
      console.log(changeDateFormat)
      this.timesheetid = ''

      let NewDate
      for (let i = 0; i < this.Data.monthdata.length; i++) {
        console.log(this.Data.monthdata[i].statusid);
        console.log(this.Data.monthdata[i].date);
        const newDate1 = new Date(this.Data.monthdata[i].date)
        const month = ("0" + (newDate1.getMonth() + 1)).slice(-2);
        const year = newDate1.getFullYear();
        const date = ("0" + newDate1.getDate()).slice(-2);
        const changeDateFormat1 = year + "-" + month + "-" + date

        if (changeDateFormat1 == changeDateFormat) {
          this.timesheetid = this.Data.monthdata[i].timesheetid
          NewDate = 'N'
          break;
        }
        else {
          console.log('Failed');
          NewDate = 'Y'
        }
      }

      if (this.timesheetid == 'undefined') {
        this.timesheetid = ''
      }
      else {
        this.timesheetid = this.timesheetid
      }

      const navigationExtras: NavigationExtras = {
        state: {
          date: changeDateFormat,
          timesheetid: this.timesheetid,
          NewDate1: NewDate
        }
      };
      console.log(navigationExtras)

      this.router.navigateByUrl('timesheet-view', navigationExtras);
      (await loading).dismiss();
   
    }
    else {
      (await loading).dismiss();
      console.log('low');
      this.showToast('Please select current or past date');
    }
  };
  

  async getDashboard(DateSelection) {
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
      } else {
        console.log("No data");
        this.showToast(returnData.errormessage);
      }
    })
  }
  AddEvents(monthdata) {
    debugger
    console.log('inside Add events');
    var events = [];
    console.log(monthdata);

    monthdata = [{
      date: '2021-10-04'
    },
    {
      date: '2021-10-03'
    }]
    
    for (var i = 0; i < monthdata.length; i++) {
      var date = new Date(monthdata[i].date);

      var startTime;
      var endTime;
      startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
      endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  
      console.log(startTime);


      console.log(endTime);

      events.push({
        title: 'All Day - ' + i,
        startTime: startTime,
        endTime: endTime,
        allDay: true
      });
    }
    console.log(JSON.stringify(events))
    return events;
  }
  async SearchData(data1) {

    console.log(this.SelectedMonth + "" + this.SelectedYear);
    //var dateMonth = new Date(this.SelectedMonth)
    var dateMonth = new Date(data1)
    var MonthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var Month = MonthArr[dateMonth.getMonth()]
    console.log(Month);
    //var dateYear = new Date(this.SelectedYear)
    var dateYear = new Date(data1)
    var Year = dateYear.getFullYear()
    const changeDateFormat = Month + "-" + Year
    console.log(JSON.stringify(changeDateFormat));
    const Params = "?month=" + changeDateFormat
    console.log(JSON.stringify(Params));
    await this.webApi.getData("/timesheetservice/gettscalview", Params).then(async data => {
      const returnData: any = await data
      console.log(returnData)

      if (returnData.issucess === 'Y') {
        this.Data = JSON.parse(returnData.data)
        console.log(this.Data);
        let mData = JSON.parse(returnData.data)
        this.monthdata = mData.monthdata
        // this.events =  this.monthdata
        this.MonthDatalength = this.monthdata.length;
        console.log(this.monthdata);
      } else {
        console.log("No data");
        this.showToast(returnData.errormessage);
      }
    })
  }
  async Search() {

    const alert = await this.alertController.create({
      cssClass: 'alertCancel',
      header: 'Search Timesheet',
      message: 'Select date of Month',
      inputs: [
        {
          name: 'Month',
          type: 'date'

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
          handler: (data1) => {
            console.log('Confirm Ok');
            this.SearchData(data1.Month)
          }
        }
      ]
    });

    await alert.present();

  }


  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        console.log(startTime + " - " + endTime)
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
          color: {
            primary: '#488aff',
            secondary: '#bbd0f5'
          }
        });
      }
    }
    console.log(JSON.stringify(events))
    return events;
  }


  monthViewLabel(events) {
    if (!events.length) {
      return {
        // 'margin-top': '11px'
      };
    }
  }
}
