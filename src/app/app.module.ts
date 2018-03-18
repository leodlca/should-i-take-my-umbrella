import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Config } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConfigPage } from '../pages/config/config';
import { AboutPage } from '../pages/about/about'; 

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { CoreProvider } from '../providers/core/core';
import { ServerConfigProvider } from '../providers/server-config/server-config';
import { NativeStorage } from '@ionic-native/native-storage';
import { LocationProvider } from '../providers/location/location';
import { XHoursProvider } from '../providers/x-hours/x-hours';
import { PopUpProvider } from '../providers/pop-up/pop-up';
import { FirstRunProvider } from '../providers/first-run/first-run';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConfigPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConfigPage,
    AboutPage
  ],
  providers: [
    HttpClientModule,
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CoreProvider,
    ServerConfigProvider,
    NativeStorage,
    LocationProvider,
    XHoursProvider,
    PopUpProvider,
    FirstRunProvider
  ]
})
export class AppModule {}
