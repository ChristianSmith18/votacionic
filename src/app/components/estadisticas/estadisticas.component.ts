import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {
  id: string;
  pregunta: string;
  usuario: string;
  votoPositivo: number;
  votoNegativo: number;
  votoNulo: number;

  myChart: Chart;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.pregunta = this.navParams.get('pregunta');
    this.usuario = this.navParams.get('usuario');
    this.votoNegativo = this.navParams.get('votoNegativo');
    this.votoPositivo = this.navParams.get('votoPositivo');
    this.votoNulo = this.navParams.get('votoNulo');

    // Initialize chart
    const ctx = document.getElementById('myChart');
    this.myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['A favor', 'En contra', 'Voto nulo'],
        datasets: [
          {
            label: '# of Votes',
            data: [this.votoPositivo, this.votoNegativo, this.votoNulo],
            backgroundColor: [
              'rgba(104, 235, 28, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(212, 212, 212, 0.4)'
            ],
            borderColor: [
              'rgba(104, 235, 28, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(212, 212, 212, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          position: 'bottom',
        }
      }
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  addVotePositivo() {
    this.updateData(0, ++this.votoPositivo);
  }

  addVoteNegativo() {
    this.updateData(1, ++this.votoNegativo);
  }

  addVoteNulo() {
    this.updateData(2, ++this.votoNulo);
  }

  updateData(posicion: number, valor: number) {
    this.myChart.data.datasets[0].data[posicion] = valor;
    this.myChart.update();
  }
}
