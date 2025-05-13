

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

import { EpargneService }      from '../services/epargne.service';
import { EpargneInvestment }   from '../models/epargne-investment.model';
import { PerformanceChartComponent } from './performance-chart.component';

@Component({
  standalone: true,
  selector: 'app-epargne-form',
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
  templateUrl: './epargne-form.component.html',
})
export class EpargneFormComponent {
  types = ['Livret A','PEL','Assurance-vie','LDDS'];

  epargneList: EpargneInvestment[] = [];
  newEpargne: EpargneInvestment = {
    type: '',
    amountInvested: 0,
    interestRate: 0,
    purchaseDate: new Date().toISOString().split('T')[0]
  };

  filterTerm: string = '';
  totalInvested: number = 0;

  constructor(
    private epargneService: EpargneService,
    private snackBar: MatSnackBar
  ) {
    this.loadEpargne();
  }

  loadEpargne() {
    this.epargneService.getAll().subscribe({
      next: data => {
        this.epargneList = data;
        this.computeTotal();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Erreur lors du chargement de l’épargne', 'Fermer', { duration: 2000 });
      }
    });
  }

  addEpargne() {
    this.epargneService.create(this.newEpargne).subscribe({
      next: () => {
        this.snackBar.open('Épargne ajoutée !', 'OK', { duration: 2000 });
        this.newEpargne = {
          type: '',
          amountInvested: 0,
          interestRate: 0,
          purchaseDate: new Date().toISOString().split('T')[0]
        };
        this.loadEpargne();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Erreur lors de l’ajout', 'Fermer');
      }
    });
  }

  deleteEpargne(id: number) {
    this.epargneService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Épargne supprimée !', 'OK', { duration: 2000 });
        this.loadEpargne();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Erreur lors de la suppression', 'Fermer');
      }
    });
  }

  get filteredEpargne(): EpargneInvestment[] {
    const term = this.filterTerm.toLowerCase();
    return this.epargneList.filter(x =>
      x.type.toLowerCase().includes(term)
    );
  }

  private computeTotal() {
    this.totalInvested = this.epargneList
      .reduce((sum, x) => sum + x.amountInvested, 0);
  }
}
