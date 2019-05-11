import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MethodsService {

  constructor(
    public toastCtrl: ToastController
  ) { }

  async presentToast(texto: string = '', duracion: number = 0, tipo: string) {
    const toast = await this.toastCtrl.create({
      message: texto,
      duration: duracion * 1000,
      color: tipo,
      position: 'top'
    });
    toast.present();
  }

  verificador(texto: string) {
    if (texto.length !== 18) {
      return false;
    }
    if (texto[0] !== 'u') {
      return false;
    }
    if (texto[11] !== 'a') {
      return false;
    }
    if (texto[12] !== 'c') {
      return false;
    }
    if (texto[17] !== 's') {
      return false;
    }
    return true;
  }
}
