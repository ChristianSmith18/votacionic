import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

// Services
import { DatabaseService } from '../../services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { MethodsService } from 'src/app/services/methods.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  nombre = '';
  apellido = '';
  correo = '';
  password = '';
  confirm = '';
  terminosCond = false;

  constructor(
    private modalCtrl: ModalController,
    private database: DatabaseService,
    private auth: AuthService,
    private metodos: MethodsService
    ) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  terminos(event: any) {
    this.terminosCond = event.detail.checked;
  }

  validation() {
    if (this.nombre !== '' && this.apellido !== '' && this.correo !== '' && this.password !== '') {
      if (this.password === this.confirm) {
        return true;
      }
    }
    return false;
  }

  addData() {
    this.database.addData(this.correo, this.nombre, this.apellido);
  }

  createUser() {
    if (this.terminosCond) {
      if (this.validation()) {
        this.auth.createUser(this.correo, this.password)
        .then(() => {
          console.log('Creado correctamente!');
          this.addData();
        }).catch((err) => {
          console.log('Error: ', err);
        });
      } else {
        this.metodos.presentToast('Rellene todos los datos correctamente.', 1.5, 'danger');
      }
    } else {
      this.metodos.presentToast('Debe aceptar los términos y condiciones.', 1.5, 'warning');
    }
  }

  // createVote() {
  //   this.database.createVotacion('pokemon@pk.pk', 'asgdb', 'hola');
  // }
}
