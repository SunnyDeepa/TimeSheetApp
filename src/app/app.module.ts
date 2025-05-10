import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, NavParams, Platform } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { WebApiService } from './services/web-api.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
     BrowserModule,
     IonicStorageModule.forRoot(),
     IonicModule.forRoot({hardwareBackButton: false}), 
     AppRoutingModule,
     HttpClientModule,
     NgxPaginationModule
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Platform, WebApiService, NavParams,
    Storage],
  bootstrap: [AppComponent],
})
export class AppModule {}
