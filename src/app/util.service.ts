import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private alertCtrl: AlertController
  ) {}

  async presentAlert(messageText) {
    const alert = await this.alertCtrl.create({
      header: "Atenção",
      message: messageText,
      buttons: ['Ok']
    });
    await alert.present();
  }
}
