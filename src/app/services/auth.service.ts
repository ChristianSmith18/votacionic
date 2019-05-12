import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private authAFB: AngularFireAuth,
    public toastCtrl: ToastController
    ) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authAFB.auth
        .signInWithEmailAndPassword(email, password)
        .then(event => { resolve(event); })
        .catch(err => { reject(err); });
    });
  }

  createUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authAFB.auth.createUserWithEmailAndPassword(email, password)
      .then(event => { resolve(event); })
      .catch(err => { reject(err); });
    });
  }

  signOut() {
    return new Promise((resolve, reject) => {
      this.authAFB.auth.signOut()
      .then(() => { resolve(); })
      .catch(err => { reject(err); });
    });
  }
}
