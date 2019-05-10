import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';

// Plugins

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  error = '';

  ngOnInit() {
    this.abrirQR();
  }
  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController
  ) {}

  abrirQR() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        console.log('Barcode data', barcodeData);
        console.log(barcodeData.cancelled.valueOf);
        // this.error = JSON.stringify(barcodeData);
        if (this.verificador(barcodeData.text)) {
          this.error = 'true';
        } else {
          this.error = 'false';
        }
      })
      .catch(err => {
        setTimeout(() => {
          this.presentToast('Error: BarcodeScanner no disponible.', 1.5, 'danger');
        }, 2000);
      });
  }

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
