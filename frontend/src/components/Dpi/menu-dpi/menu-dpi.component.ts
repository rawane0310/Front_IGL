import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUser, faNotesMedical, faUserNurse, faChartBar} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-menu-dpi',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './menu-dpi.component.html',
  styleUrls: ['./menu-dpi.component.css'] 
})
export class MenuDpiComponent {
 faUser= faUser;
 faNotesMedical= faNotesMedical;
 faUserNurse= faUserNurse;
 faChartBar= faChartBar;
}
