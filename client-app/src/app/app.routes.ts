import { Routes } from '@angular/router';
import { CryptoFormComponent   } from './components/crypto-form.component';
import { ActionFormComponent   } from './components/action-form.component';
import { EpargneFormComponent  } from './components/epargne-form.component';
import { DashboardComponent } from './components/dashboard.component';

export const routes: Routes = [
  { path: 'crypto',  component: CryptoFormComponent },
  { path: 'actions', component: ActionFormComponent },
  { path: 'epargne', component: EpargneFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
