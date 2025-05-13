
import { Component }       from '@angular/core';
import { RouterOutlet }    from '@angular/router';
import { NgChartsModule }  from 'ng2-charts';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [ NavbarComponent, RouterOutlet, NgChartsModule /* … autres imports … */],
  selector: 'app-root',
  templateUrl: './app.component.html',
 // styleUrls: ['./app.component.scss']
})
export class AppComponent {}
