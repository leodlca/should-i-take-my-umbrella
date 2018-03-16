import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CoreProvider } from '../../providers/core/core';
import { StatusBar } from '@ionic-native/status-bar';

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
  private statusBar: StatusBar) {
  }

  ionViewDidLoad() {
    this.initiateBody();
    this.getData();
  }

  initiateBody() {
    const hours = 10//new Date().getHours();

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

  getData() {
    this.coreProvider.shouldI('11453140').then(res => {
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

}
