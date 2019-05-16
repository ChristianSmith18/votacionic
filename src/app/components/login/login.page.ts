import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MethodsService } from '../../services/methods.service';
import { ModalController } from '@ionic/angular';

// Components
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = '';
  password = '';

  constructor(
    private authService: AuthService,
    public router: Router,
    public metodos: MethodsService,
    private modalCtrl: ModalController
    ) { }

  onSubmitLogin() {
    if (this.user !== '' && this.password !== '') {
      this.authService.login(this.user, this.password)
      .then(() => {
        this.password = '';
        this.router.navigateByUrl('/tabs/tab1)');
      }).catch((err) => {
        this.metodos.presentToast('Error: Usuario o contraseña incorrectos.', 2 , 'danger');
        this.user = '';
        this.password = '';
      });
    } else {
      this.metodos.presentToast('Alerta: Debe rellenar todos los campos antes de continuar.', 1.5, 'warning');
    }
  }

  openSignUp() {
    this.modalCtrl.create({
      component: SignUpComponent
    }).then((modal) => {
      modal.present();
    });
  }

}
