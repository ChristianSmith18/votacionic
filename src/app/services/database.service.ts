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
  constructor(private database: AngularFirestore) {}

  getVotes() {
    return this.database
      .collection('votaciones')
      .snapshotChanges()
      .pipe(
        map(datos => {
          return datos.map(votaciones => {
            const data: Votacion = votaciones.payload.doc.data() as Votacion;
            data.id = votaciones.payload.doc.id;
            return data;
          });
        })
      );
  }

  addData(correo: string, nombre: string, apellido: string) {
    // Add a new document in collection "cities"
    this.database.collection('votaciones')
      .doc(correo)
      .set({
        nombre,
        apellido,
        votaciones: {
          creadas: {},
          participadas: {}
        }
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  createVotacion(correo: string, idVotacion: string, contenido: string) {
    this.database.collection('votaciones').doc(correo).update({
        'votaciones.creadas': [{
         idVotacion,
         contenido,
         votos: {},
         participantes: {}
        }]
    }).then(() => {
      console.log('Actualizado correctamente');
    }).catch((err) => {
      console.log('Error: ', err);
    });
  }
}
