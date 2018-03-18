import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class XHoursProvider {

  constructor(private storage: NativeStorage) {
  }

  get(){
    return new Promise((resolve, reject) => {
      this.storage.getItem('x-hours').then(res => {
        resolve(res);
      }, err => {
        this.set(12).then(res => {
          resolve(res);
        }, err => {
          reject(err)
        });
      });
    }); 
  }

  set(xHours){
    return new Promise((resolve, reject) => {
      this.storage.setItem('x-hours', xHours).then(res => {
        resolve(xHours);
      }, err => {
        reject(err);
      });
    });
  }

}
