
import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.scss']
})
export class PerformanceChartComponent {
  public lineChartLabels: string[] = ['2020','2021','2022','2023','2024'];

  public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: [
      {
        data: [1000,1100,1300,1600,2000],
        label: 'SP500 (rendement)',
        fill: false,
        tension: 0.3,
        borderColor: 'rgba(148,0,211,0.7)',
        pointBackgroundColor: 'rgba(148,0,211,0.7)'
      },
      {
        data: [1000,1050,1080,1100,1120],
        label: 'Épargne (compte)',
        fill: false,
        tension: 0.3,
        borderDash: [5,5],
        borderColor: 'rgba(186,85,211,0.7)',
        pointBackgroundColor: 'rgba(186,85,211,0.7)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    },
    scales: {
      x: { title: { display: true, text: 'Années' } },
      y: { title: { display: true, text: 'Valeur (€)' } }
    }
  };
}
