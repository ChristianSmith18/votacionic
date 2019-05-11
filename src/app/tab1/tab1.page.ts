import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

// Metodos Reciclados
import { MethodsService } from '../services/methods.service';


// Plugins
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  ID = this.createID();
  imgSrc: string;
  showQR = false;

  constructor(
    private clipboard: Clipboard,
    public loadCtrl: LoadingController,
    private screenOrientation: ScreenOrientation,
    public metodos: MethodsService
  ) {}

  ngOnInit() {
    this.screenOrientation
      .lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
      .catch(() => {
        this.metodos.presentToast('Error: Rotación de pantalla no disponible.', 1.5, 'danger');
      });
  }

  createID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    let textoID = '';
    while (!this.metodos.verificador(textoID)) {
      textoID =
        'u' +
        Math.random()
          .toString(36)
          .substr(2, 10) +
        'ac' +
        Math.random()
          .toString(36)
          .substr(6, 10) +
        's';
    }
    return textoID;
  }

  actualizar(event: { target: { complete: () => void } }) {
    setTimeout(() => {
      this.ID = this.createID();
      event.target.complete();
    }, 500);
  }

  copiarID() {
    this.clipboard
      .copy(this.ID)
      .then(() => {
        this.metodos.presentToast('Texto copiado en el portapapeles.', 1.5, 'medium');
      })
      .catch(() => {
        this.metodos.presentToast('Error: Dispositivo no compatible.', 1.5, 'danger');
      });
  }

  async presentLoading() {
    const loading = await this.loadCtrl.create({
      message: 'Generando QR..',
      duration: 1000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    this.showQR = true;
  }

  genvot() {
    const textArea: string =
      (document.getElementById('myTextarea') as HTMLInputElement).value + '';
    if (textArea.replace(' ', '') === '') {
      this.metodos.presentToast('Escriba una pregunta antes de continuar', 2, 'danger');
    } else {
      this.imgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${
        this.ID
      }`;
      this.presentLoading();
    }
  }

  clearAll() {
    this.ID = this.createID();
    this.showQR = false;
  }
}
