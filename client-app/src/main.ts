
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom }  from '@angular/core';
import { provideRouter }        from '@angular/router';
import { provideHttpClient }    from '@angular/common/http';
import { NgChartsModule }       from 'ng2-charts';

import { AppComponent }         from './app/app.component';
import { routes }               from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    //  importer NgChartsModule pour Chart.js
    importProvidersFrom(NgChartsModule),
    // router et http
    provideRouter(routes),
    provideHttpClient(),
  ]
})
  .catch(err => console.error(err));
