import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private auth: AuthService,
    private router: Router
    ) {}
  cerrarSesion() {
    this.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
