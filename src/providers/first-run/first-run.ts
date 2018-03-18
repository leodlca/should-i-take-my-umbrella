import { NativeStorage } from '@ionic-native/native-storage';
import { Injectable } from '@angular/core';

@Injectable()
export class FirstRunProvider {

  constructor(private storage: NativeStorage) {
  }

  run() {
    this.storage.setItem('first-run', true);
  }

  isFirstRun() {
    return new Promise((resolve, reject) => {
      this.storage.getItem('first-run').then(res => {
        if(res) {
          resolve(res);
        } else {
          reject(res);
        }
      }, err => {
        reject(err);
      });
    });
    
  }

}
