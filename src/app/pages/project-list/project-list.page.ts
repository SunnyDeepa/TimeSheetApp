import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { WebApiService } from 'src/app/services/web-api.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.page.html',
  styleUrls: ['./project-list.page.scss'],
  standalone:false
})
export class ProjectListPage implements OnInit {

  ProjectList
  SearchText: any = '';
  Typeid
  constructor(private webApi: WebApiService, private loadingController: LoadingController, private ModaCtrl: ModalController,
    public navParams: NavParams) {
    this.presentLoadingCustom();
    this.Typeid = navParams.get('typeid')
    this.initializeItems()
  }
  async showAll() {
    this.SearchText = '';
    await this.initializeItems()
  }
  getItems(ev: any, SearchText) {
    SearchText
   //  this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.ProjectList = this.ProjectList.filter((item) => {
        return (item.val.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Projectlist Page');
  }

  // loading
  async presentLoadingCustom() {
    // this.loading = this.loadingController.create({
    //   mode: 'ios',
    //   message: 'Please Wait..',
    //   spinner: 'circles'
    // });
    // (await this.loading).present();
  }
  async initializeItems() {
    const loading = this.loadingController.create({
      mode: 'ios',
      message: 'Please Wait..',
      spinner: 'circles'
    });
    (await loading).present();
    var params = ''
    try {
      await this.webApi.getData("/timesheetservice/gettsmasterlist", params).then(async data => {
        console.log(JSON.stringify(data));
        (await loading).dismiss();
        const returnData: any = await data;
        console.log(returnData);
        var Data = JSON.parse(returnData.data)
        console.log(Data);
        this.ProjectList = await Data.project

      }).catch(ex => {
        console.log(JSON.stringify(ex));
      })
    } catch (ex) {
      console.log(ex)
    }

  }
  GobacktoInitialPage(item) {
    console.log(item);
    
    this.ModaCtrl.dismiss(item)
  }

  CloseModal() {
    this.ModaCtrl.dismiss("Back")
  }



  ngOnInit() {
  }

}
