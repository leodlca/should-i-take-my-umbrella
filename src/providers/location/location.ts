import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class LocationProvider {

  constructor(private alertCtrl: AlertController, private storage: NativeStorage) {
  }

  askForAddress() {

    return new Promise((resolve, reject) => {

      let alert = this.alertCtrl.create({
        title: 'Insira CEP ou o nome de sua cidade',
        message: 'Escreva apenas o nome de sua cidade ou seu CEP.',
        inputs: [
          {
            name: 'address',
            placeholder: 'Cidade ou CEP'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              reject('Não foi possível obter sua localização :(');
            }
          },
          {
            text: 'Salvar',
            handler: data => {
  
              this.storage.setItem('address', data.address).then(res => {
                resolve(data.address);
              }, err => {
                reject('Não foi possível salvar sua localização :(');
              });
  
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
