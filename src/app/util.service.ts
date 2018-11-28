import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public apiKey = 'cd48e1c22de0961d5d1bfb14f8a66e006cfb1cfbf3f0c0f3'
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
