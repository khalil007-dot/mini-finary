

import { Component }      from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

// Angular Material modules
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatSelectModule }     from '@angular/material/select';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatDividerModule }    from '@angular/material/divider';
import { MatIconModule }       from '@angular/material/icon';
import { MatSnackBarModule }   from '@angular/material/snack-bar';
import { MatSnackBar }         from '@angular/material/snack-bar';

import { ActionService }      from '../services/action.service';
import { ActionInvestment }   from '../models/action-investment.model';
import { PerformanceChartComponent } from './performance-chart.component';

@Component({
  standalone: true,
  selector: 'app-action-form',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
    PerformanceChartComponent
  ],
  templateUrl: './action-form.component.html',
})
export class ActionFormComponent {
  tickerList = ['AAPL','MSFT','GOOGL','AMZN','TSLA'];
  platforms  = ['Euronext','NASDAQ','NYSE'];

  actionList: ActionInvestment[] = [];
  newAction: ActionInvestment = {
    ticker: '',
    platform: '',
    amountInvested: 0,
    purchaseDate: new Date().toISOString().split('T')[0]
  };

  filterTerm: string = '';
  totalInvested: number = 0;

  constructor(
    private actionService: ActionService,
    private snackBar: MatSnackBar
  ) {
    this.loadActions();
  }

  loadActions() {
    this.actionService.getAll().subscribe({
      next: data => {
        this.actionList = data;
        this.computeTotal();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Erreur lors du chargement des actions', 'Fermer', { duration: 2000 });
      }
    });
  }

  addAction() {
    this.actionService.create(this.newAction).subscribe({
      next: () => {
        this.snackBar.open('Action ajoutée !', 'OK', { duration: 2000 });
        this.newAction = {
          ticker: '',
          platform: '',
          amountInvested: 0,
          purchaseDate: new Date().toISOString().split('T')[0]
        };
        this.loadActions();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Erreur lors de l’ajout', 'Fermer');
      }
    });
  }

  deleteAction(id: number) {
    this.actionService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Action supprimée !', 'OK', { duration: 2000 });
        this.loadActions();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Erreur lors de la suppression', 'Fermer');
      }
    });
  }

  get filteredActions(): ActionInvestment[] {
    const term = this.filterTerm.toLowerCase();
    return this.actionList.filter(x =>
      x.ticker.toLowerCase().includes(term) ||
      x.platform.toLowerCase().includes(term)
    );
  }

  private computeTotal() {
    this.totalInvested = this.actionList
      .reduce((sum, x) => sum + x.amountInvested, 0);
  }
}
