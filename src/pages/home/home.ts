import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CoreProvider } from '../../providers/core/core';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';
import { LocationProvider } from '../../providers/location/location';

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

  constructor(public navCtrl: NavController, public coreProvider: CoreProvider,
  private statusBar: StatusBar, private storage: NativeStorage, private location: LocationProvider) {
  }

  ionViewDidLoad() {
    this.initiateBody();
    this.loadAddress();
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

  getData(address) {

    this.coreProvider.shouldI(address).then(res => {
      this.message = res['friendlyMessage'];
      this.summary = res['hourly'].summary;
      this.averagePrecipProbability = res['averagePrecipProbability'];
      this.temperature = res['temperature'];
    }, err => {

    });
  }

  doRefresh(refresher) {

    this.coreProvider.shouldI('11453140').then(res => {
      this.message = res['friendlyMessage'];
      this.summary = res['hourly'].summary;
      this.averagePrecipProbability = res['averagePrecipProbability'];
      this.temperature = res['temperature'];
      refresher.complete();
    }, err => {

    });

  }

  loadAddress() {

    this.storage.getItem('stored-address')
    .then(res => {

      this.getData(res);

    }, err => {

      this.location.askForAddress().then(res => {

      }, err => {

        this.message = 'Não foi possível obter sua localização :('

      });

    });

  }

}
