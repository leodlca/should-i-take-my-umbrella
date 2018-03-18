import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { XHoursProvider } from '../../providers/x-hours/x-hours';
import { PopUpProvider } from '../../providers/pop-up/pop-up';
import { LocationProvider } from '../../providers/location/location';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  xHour: any = 12;
  hours: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private xHours: XHoursProvider,
  private popUp: PopUpProvider, private location: LocationProvider) {
  }

  ionViewDidLoad() {
    this.hours = this.generateHours(1, 24);
    this.xHours.get().then(xHour => {
      this.xHour = xHour;
    });
  }

  generateHours(min, max) {
    let arr = [];
    for(let i = min; i <= max; i++) {
      arr.push(i);
    }
    return arr;
  }

  changeXHour() {
    this.xHours.set(this.xHour).then(res => {
      this.popUp.showToast('Configuração alterada com sucesso!');
    }, err => {
      this.popUp.showToast('Erro ao alterar valor, reinicie o app e tente novamente.')
    });
  }

  changeAddress() {
    this.location.askForAddress().then(res => {
      this.popUp.showToast('Configuração alterada com sucesso!');
    }, err => {
      this.popUp.showToast('Erro ao alterar localização, tente novamente.');
    });
  }  

}
