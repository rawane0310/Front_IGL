import { Component, signal } from '@angular/core';
import { MenuDpiComponent } from '../menu-dpi/menu-dpi.component';
import { CardComponent } from "./card/card.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { AddSoinFormComponent } from "../add-soin-form/add-soin-form.component";
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-soins-dpi',
  standalone: true,
  imports: [CardComponent, FontAwesomeModule, AddSoinFormComponent],
  templateUrl: './soins-dpi.component.html',
  styleUrl: './soins-dpi.component.css'
})
export class SoinsDpiComponent {
  faCirclePlus = faCirclePlus;
  addFormOpened = signal(false)

  dpiId !: string;
  soinsInfermiers = [];

  openAddForm(event: Event) {
    event.stopPropagation()
    this.addFormOpened.set(true);
  }
  closeAddForm() {
    this.addFormOpened.set(false);
  }

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.dpiId = this.route.parent?.snapshot.paramMap.get('dpiId')!;
    try{
      const response = await axios.get('http://localhost:8000/traitements/soin-infirmier/search/?dossier='+this.dpiId,{
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1MTYzODc0LCJpYXQiOjE3MzUxNjM1NzQsImp0aSI6IjI1YjMzOTY3M2ViODRhYzc5N2QyYTRlZDc0YWQxMTRjIiwidXNlcl9pZCI6MTgsInJvbGUiOiJ0ZWNobmljaWVuIn0.dCcl-MQBtVhMuCviYouJXXDaAvgdcUYeokxDr27sUVU'
        }
      });
      console.log(response);
      if (response.status === 200) this.soinsInfermiers = response.data;
      else console.error('Erreur lors de la récupération des soins');
    }
    catch(err){
      console.log(err);
    }
  }
}
