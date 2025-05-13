// src/app/components/crypto-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';

// angular material imports supplémentaires
import { MatCardModule }        from '@angular/material/card';
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatSelectModule }      from '@angular/material/select';
import { MatInputModule }       from '@angular/material/input';
import { MatButtonModule }      from '@angular/material/button';
import { MatDividerModule }     from '@angular/material/divider';
import { MatIconModule }        from '@angular/material/icon';
import { MatSnackBarModule }    from '@angular/material/snack-bar';
import { MatSnackBar }          from '@angular/material/snack-bar';
import { MatListModule }        from '@angular/material/list';
import { MatChipsModule }       from '@angular/material/chips';

import { CryptoService }     from '../services/crypto.service';
import { CryptoInvestment }  from '../models/crypto.model';
import { PerformanceChartComponent } from './performance-chart.component';

interface CryptoWithPerf extends CryptoInvestment {
  performance: number;
}

@Component({
  standalone: true,
  selector: 'app-crypto-form',
  imports: [
    CommonModule,
    FormsModule,


    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
    MatListModule,
    MatChipsModule,
    PerformanceChartComponent
  ],
  templateUrl: './crypto-form.component.html',
  styleUrls: ['./crypto-form.component.scss']
})
export class CryptoFormComponent implements OnInit {
  availableCryptos = [
    'Bitcoin','Ethereum','Solana','Cardano','XRP',
    'Polkadot','Litecoin','Avalanche','Dogecoin','Chainlink'
  ];
  availablePlatforms = [
    'Binance','Coinbase','Kraken','Crypto.com','Bitstamp'
  ];

  cryptoList: CryptoWithPerf[] = [];
  newCrypto: CryptoInvestment = {
    name: '',
    platform: '',
    amountInvested: 0,
    purchasePrice: 0,
    purchaseDate: new Date().toISOString().split('T')[0]
  };

  filterTerm: string = '';
  totalInvested: number = 0;

  constructor(
    private cryptoService: CryptoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadCryptos();
  }

  loadCryptos() {
    this.cryptoService.getAll().subscribe({
      next: data => {
        this.cryptoList = data.map(inv => ({
          ...inv,
          // performance = montant investi - prix d’achat
          performance: +(inv.amountInvested - inv.purchasePrice).toFixed(2)
        }));
        this.computeTotal();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Erreur lors du chargement', 'Fermer', { duration: 2000 });
      }
    });
  }

  addCrypto() {
    this.cryptoService.create(this.newCrypto).subscribe({
      next: () => {
        this.snackBar.open('Crypto ajoutée !', 'OK', { duration: 2000 });
        this.resetForm();
        this.loadCryptos();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Erreur lors de l’ajout', 'Fermer', { duration: 2000 });
      }
    });
  }

  deleteCrypto(id?: number) {
    if (!id) return;
    this.cryptoService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Crypto supprimée !', 'OK', { duration: 2000 });
        this.loadCryptos();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 2000 });
      }
    });
  }

  get filteredCryptos(): CryptoWithPerf[] {
    const term = this.filterTerm.toLowerCase();
    return this.cryptoList.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.platform.toLowerCase().includes(term)
    );
  }

  private computeTotal() {
    this.totalInvested = this.cryptoList
      .reduce((sum, c) => sum + c.amountInvested, 0);
  }

  private resetForm() {
    this.newCrypto = {
      name: '',
      platform: '',
      amountInvested: 0,
      purchasePrice: 0,
      purchaseDate: new Date().toISOString().split('T')[0]
    };
  }

  /** Différence instantanée = amountInvested - purchasePrice */
  get purchasePerformance(): number {
    const inv = this.newCrypto;
    if (inv.amountInvested > 0 && inv.purchasePrice > 0) {
      return +(inv.amountInvested - inv.purchasePrice).toFixed(2);
    }
    return 0;
  }
}
