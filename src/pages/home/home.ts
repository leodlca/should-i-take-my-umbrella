import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CoreProvider } from '../../providers/core/core';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';
import { LocationProvider } from '../../providers/location/location';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { XHoursProvider } from '../../providers/x-hours/x-hours';
import { FirstRunProvider } from '../../providers/first-run/first-run';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  navbarColor: string = 'morning';
  currentBody: string = 'body-morning';
  star: string = 'assets/imgs/sun.png';
  message: string = 'Carregando...'
  temperature: number = -999;
  summary: string = '';
  averagePrecipProbability: number = -1;
  xHoursDisplay: any = -999;

  geolocationOptions: GeolocationOptions = {
    timeout: 3000,
    enableHighAccuracy: true,
    maximumAge: 100000
  };

  constructor(public navCtrl: NavController, public coreProvider: CoreProvider,
  private statusBar: StatusBar, private storage: NativeStorage, private location: LocationProvider,
  private geolocation: Geolocation, private xHours: XHoursProvider, private firstRun: FirstRunProvider) {
  }

  ionViewDidLoad() {
    this.initiateBody();
    //this.loadAddress();
    this.getDataByAddress('London');
    this.statusBar.styleLightContent();
  }

  initiateBody() {
    const hours = new Date().getHours();

    if(hours >= 19 || hours <= 6){
      this.currentBody = 'body-night';
      this.star = 'assets/imgs/moon.png';
      this.navbarColor = 'night';
    } else {
      this.currentBody = 'body-morning';
      this.star = 'assets/imgs/sun.png';
      this.navbarColor = 'morning';
    }
  }

  getDataByAddress(address, refresher?) {

    this.xHours.get().then(xHours => {

      this.coreProvider.addressShouldI(address, xHours).then(res => {

        this.message = res['friendlyMessage'];
        this.summary = res['hourly'].summary;
        this.averagePrecipProbability = res['averagePrecipProbability'];
        this.temperature = res['temperature'];
        this.xHoursDisplay = xHours;
  
        console.log(JSON.stringify(res, undefined, 2));
        console.log(this.averagePrecipProbability);
        console.log((this.averagePrecipProbability * 100).toFixed(1).toString())
        this.changeStar(res['averagePrecipProbability']);
        if(refresher) refresher.complete();
  
      }, err => {
  
        this.message = 'Não foi possível encontrar seu endereço :( Ligue seu GPS!';
        if(refresher) refresher.complete();
  
      });

    });

  }

  getDataByLatLng(lat, lng, refresher?) {

    this.xHours.get().then(xHours => {

      this.coreProvider.latlngShouldI(lat, lng, xHours).then(res => {

        this.message = res['friendlyMessage'];
        this.summary = res['hourly'].summary;
        this.averagePrecipProbability = res['averagePrecipProbability'];
        this.temperature = res['temperature'];
        this.xHoursDisplay = xHours;

        this.changeStar(res['averagePrecipProbability']);
        if(refresher) refresher.complete();
  
      }, err => {
  
        this.message = 'Não foi possível obter informações para sua localização :(';
        if(refresher) refresher.complete();
  
      });

    });

  }

  changeStar(percentage){
    if(percentage <= 0.19) {
      this.initiateBody();
    } else if(percentage <= 0.49) {
      this.star = 'assets/imgs/cloud.png';
    } else {
      this.star = 'assets/imgs/rain.png'
    }
  } 

  doRefresh(refresher) {

    this.loadAddress(refresher);

  }

  loadAddress(refresher?) {

    this.geolocation.getCurrentPosition(this.geolocationOptions).then(res => {

      const lat = res.coords.latitude;
      const lng = res.coords.longitude;
      
      console.log('got lat, lng');
      this.getDataByLatLng(lat, lng, refresher);

    }, err => {

      this.firstRun.isFirstRun().then(firstRun => {

        this.message = 'Ligue seu GPS para uma melhor experiência. Arraste a página para baixo para continuar! :D';
        console.log('first run');
        if(refresher) refresher.complete();

      }, err => {

        console.log('geolocation err runing');
        this.storage.getItem('address')
        .then(res => {

          console.log('address exists');
          this.getDataByAddress(res, refresher);

        }, err => {

          console.log('asking for address');
          this.location.askForAddress().then(res => {

            console.log('got address');
            this.getDataByAddress(res, refresher);

          }, err => {

            console.log('everything failed');
            this.message = err;
            if (refresher) refresher.complete();

          });

        });

      });

    });

  }

}
