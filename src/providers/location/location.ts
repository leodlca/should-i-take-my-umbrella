import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationProvider {

  constructor(private alertCtrl: AlertController) {
  }

  askForAddress() {

    return new Promise((resolve, reject) => {

      let alert = this.alertCtrl.create({
        title: 'Insira seu endereço ou CEP',
        message: 'Inclua rua, número, cidade e estado, ou apenas seu CEP.',
        inputs: [
          {
            name: 'address',
            placeholder: 'Endereço ou CEP'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              reject(data);
            }
          },
          {
            text: 'Salvar',
            handler: data => {
  
              resolve(data.address);
  
            }
          }
        ]
      });
  
      alert.present();

    });

  }

  getGeolocation() {

    return new Promise((resolve, reject) => {



    });

  }

}
