import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

// Interfaces
import { Votacion } from '../interfaces/votaciones.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private database: AngularFirestore
  ) { }

  getVotes() {
    return this.database.collection('votaciones').snapshotChanges()
    .pipe(map(datos => {
      return datos.map(votaciones => {
        const data: Votacion = votaciones.payload.doc.data() as Votacion;
        data.id = votaciones.payload.doc.id;
        return data;
      });
    }));
  }
}
