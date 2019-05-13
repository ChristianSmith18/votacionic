import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

// Interface
import { Votacion } from '../interfaces/votaciones.interface';
import { EstadisticasComponent } from '../components/estadisticas/estadisticas.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  votaciones: any = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    public alertCtrl: AlertController,
    public database: DatabaseService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.database.getVotes().subscribe(votaciones => {
      this.votaciones = votaciones;
    });
  }

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

  openVotacion(votacion: Votacion) {
    this.modalCtrl.create({
      component: EstadisticasComponent,
      componentProps: {
        id: votacion.id,
        votoPositivo: votacion.votoPositivo,
        votoNegativo: votacion.votoNegativo,
        votoNulo: votacion.votoNulo,
        pregunta: votacion.pregunta
      }
    }).then((modal) => {
      modal.present();
    });
  }
}
