import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

// Plugins
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// Firebase
import { firebaseConfig } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Components
import { EstadisticasComponent } from 'src/app/components/estadisticas/estadisticas.component';
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component';

// Hash
import { Md5 } from 'ts-md5/dist/md5';

@NgModule({
  declarations: [AppComponent, EstadisticasComponent, SignUpComponent],
  entryComponents: [EstadisticasComponent, SignUpComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Clipboard,
    ScreenOrientation,
    BarcodeScanner,
    Md5,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
