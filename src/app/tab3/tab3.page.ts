import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(
    private auth: AuthService,
    private router: Router,
    public alertCtrl: AlertController
  ) {}

  cerrarSesion() {
    this.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: '¿Estás seguro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.cerrarSesion();
          }
        }
      ]
    });

    await alert.present();
  }

  segmentChanged(event: any) {
    const valorSegment = event.detail.value;
    console.log(valorSegment);
  }
}
