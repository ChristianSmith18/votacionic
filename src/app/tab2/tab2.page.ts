import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// Metodos reciclados
import { MethodsService } from '../services/methods.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  error = '';

  ionViewDidEnter() {
    this.abrirQR();
  }
  constructor(
    private barcodeScanner: BarcodeScanner,
    public metodos: MethodsService
  ) {}

  abrirQR() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        console.log('Barcode data', barcodeData);
        console.log(barcodeData.cancelled.valueOf);
        // this.error = JSON.stringify(barcodeData);
        if (this.metodos.verificador(barcodeData.text)) {
          this.error = 'true';
        } else {
          this.error = 'false';
        }
      })
      .catch(err => {
        setTimeout(() => {
          this.metodos.presentToast('Error: BarcodeScanner no disponible.', 1.5, 'danger');
        }, 2000);
      });
  }
}
