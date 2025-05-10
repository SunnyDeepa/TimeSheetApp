import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { StorageService } from './StorageService/storage.service';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  serviceURL = 'https://bizzspace.in/BZTimeSheetAPI/api'

  userToken;
  constructor(private http: HttpClient, private storage: StorageService, private nav: NavController) { }

  public async GetloginData(MethodName, params) {
    console.log(JSON.stringify(params));
    try {
      const headers = new HttpHeaders({

        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      // tslint:disable-next-line:object-literal-shorthand
      const options = { headers: headers };
      const serviceURLToCall = this.serviceURL + MethodName;
      console.log(serviceURLToCall);

      return await this.http.get(serviceURLToCall, options).toPromise();
    } catch (e) {
      if (e.status === 408 || e.status === 0) {
        alert('Request Timeout');
      }
      if (e.status === 401) {
        alert('Your session has expired. Please re-login');
        this.storage.set('Name', '');
        this.storage.set('Id', '');
        this.storage.set('MobileNo', '');
        this.storage.set('language', '');
        this.storage.set('userToken', '');
        this.storage.set('language', '');
        this.storage.set('Userinfo', '');
        this.nav.setDirection('root');
        this.nav.navigateRoot('/login', { skipLocationChange: true });
      }
    }
  }

  public async PostloginData(params, serviceMethod) {
    try {
      // await this.storage.get('userToken').then(async (data) => {
      //   this.userToken = await data;
      // });
      const headers = new HttpHeaders({

        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      // tslint:disable-next-line:object-literal-shorthand
      const options = { headers: headers };
      const serviceURLToCall = this.serviceURL + serviceMethod;
      console.log(serviceURLToCall);
      const body = JSON.stringify(params);

      return await this.http.post(serviceURLToCall, body, options).toPromise();
    } catch (e) {
      if (e.status === 408 || e.status === 0) {
        alert('Request Timeout');
      }
      if (e.status === 401) {
        alert('Your session has expired. Please re-login');
        this.storage.set('Name', '');
        this.storage.set('Id', '');
        this.storage.set('MobileNo', '');
        this.storage.set('language', '');
        this.storage.set('userToken', '');
        this.storage.set('language', '');
        this.storage.set('Userinfo', '');
        this.nav.setDirection('root');
        this.nav.navigateRoot('/login', { skipLocationChange: true });
      }
    }
    // let returnData: any ;
  }

  public async getData(MethodName, params) {
    try {

      await this.storage.get('userToken').then(async (data) => {
        this.userToken = await data;
        console.log(this.userToken);
      });
      console.log(this.userToken);
      console.log(JSON.stringify(params));
      const serviceURLToCall = this.serviceURL + MethodName + params;
      // const body = JSON.stringify(params);
      console.log(serviceURLToCall);
      const headers = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.userToken // add token;
      });
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.userToken
        })
      };
      // tslint:disable-next-line:object-literal-shorthand
      const options = { headers: headers };
      return this.http.get(serviceURLToCall, options).toPromise();


    } catch (e) {
      if (e.status === 408 || e.status === 0) {
        alert('Request Timeout');
      }
      if (e.status === 401) {
        alert('Your session has expired. Please re-login');
        this.storage.set('Name', '');
        this.storage.set('Id', '');
        this.storage.set('MobileNo', '');
        this.storage.set('language', '');
        this.storage.set('userToken', '');
        this.storage.set('language', '');
        this.storage.set('Userinfo', '');
        this.nav.setDirection('root');
        this.nav.navigateRoot('/login', { skipLocationChange: true });
      }
    }
  }
  public async PostData(serviceMethod, params) {
    try {
      // let returnData: any ;
      await this.storage.get('userToken').then(async (data) => {
        this.userToken = await data;
        console.log(this.userToken);
      });
      // tslint:disable-next-line:no-debugger

      const headers = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.userToken // add token;
      });
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.userToken
        })
      };
      // tslint:disable-next-line:object-literal-shorthand
      const options = { headers: headers };
      const serviceURLToCall = this.serviceURL + serviceMethod;
      console.log(serviceURLToCall);
      const body = JSON.stringify(params);
      console.log(body);
      return await this.http.post(serviceURLToCall, body, options).toPromise();
    }
    catch (e) {
      console.log(JSON.stringify(e));
      if (e.status === 408 || e.status === 0) {
        alert('Request Timeout');
      }
      if (e.status === 401) {
        alert('Your session has expired. Please re-login'); // unable to access token;   e.statusText
        this.storage.set('Name', '');
        this.storage.set('Id', '');
        this.storage.set('MobileNo', '');
        this.storage.set('language', '');
        this.storage.set('userToken', '');
        this.storage.set('language', '');
        this.storage.set('Userinfo', '');
        this.nav.setDirection('root');
        this.nav.navigateRoot('/login', { skipLocationChange: true });
      }
    }
  }
  //  async  getData1( service, params)
  //    {
  //     return await this.http.get(params).toPromise();
  //    }
}
