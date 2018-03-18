import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class PopUpProvider {

  constructor(private toastCtrl: ToastController) {
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'Dispensar',
      duration: 3000
    });
    toast.present();
  }

}
