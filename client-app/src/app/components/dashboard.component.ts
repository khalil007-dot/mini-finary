

import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { MatCardModule }     from '@angular/material/card';
import { MatDividerModule }  from '@angular/material/divider';
import { NgChartsModule }    from 'ng2-charts';
import { ChartOptions, ChartData } from 'chart.js';
import { forkJoin }          from 'rxjs';
import { PerformanceChartComponent } from './performance-chart.component';

import { CryptoService }     from '../services/crypto.service';
import { ActionService }     from '../services/action.service';
import { EpargneService }    from '../services/epargne.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    NgChartsModule,
    PerformanceChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // totaux
  totalCrypto  = 0;
  totalAction  = 0;
  totalEpargne = 0;
  totalGlobal  = 0;

  // compteurs
  countCrypto  = 0;
  countAction  = 0;
  countEpargne = 0;

  //  forcer le littéral 'doughnut' pour que le template accepte directement
  public pieChartType: 'doughnut' = 'doughnut';

  
  public pieChartData: ChartData<'doughnut', number[], string> = {
    labels: ['Crypto', 'Actions', 'Épargne'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: [
        'rgba(148, 0, 211, 0.7)',
        'rgba(186, 85, 211, 0.7)',
        'rgba(221, 160, 221, 0.7)'
      ],
      hoverBackgroundColor: [
        'rgba(148, 0, 211, 1)',
        'rgba(186, 85, 211, 1)',
        'rgba(221, 160, 221, 1)'
      ]
    }]
  };

  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { enabled: true }
    }
  };

  constructor(
    private cryptoSvc: CryptoService,
    private actionSvc: ActionService,
    private epargneSvc: EpargneService
  ) {}

  ngOnInit(): void {
    forkJoin({
      cryptos: this.cryptoSvc.getAll(),
      actions: this.actionSvc.getAll(),
      epargne: this.epargneSvc.getAll()
    }).subscribe(({ cryptos, actions, epargne }) => {
      this.countCrypto  = cryptos.length;
      this.countAction  = actions.length;
      this.countEpargne = epargne.length;

      this.totalCrypto  = cryptos.reduce((s, c) => s + c.amountInvested, 0);
      this.totalAction  = actions.reduce((s, a) => s + a.amountInvested, 0);
      this.totalEpargne = epargne.reduce((s, e) => s + e.amountInvested, 0);
      this.totalGlobal  = this.totalCrypto + this.totalAction + this.totalEpargne;

      this.pieChartData.datasets[0].data = [
        this.totalCrypto,
        this.totalAction,
        this.totalEpargne
      ];
    });
  }
}
