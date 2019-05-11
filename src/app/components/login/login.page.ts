import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MethodsService } from '../../services/methods.service';

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
    public metodos: MethodsService
    ) { }

  onSubmitLogin() {
    if (this.user !== '' && this.password !== '') {
      this.authService.createUser(this.user, this.password)
      .then(() => {
        this.router.navigateByUrl('/tabs/tab1)');
      }).catch(() => {
        this.metodos.presentToast('Error: Usuario o contraseña incorrectos.', 2 , 'danger');
        this.user = '';
        this.password = '';
      });
    } else {
      this.metodos.presentToast('Alerta: Debe rellenar todos los campos antes de continuar.', 1.5, 'warning');
    }
  }

}
