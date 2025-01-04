import { Component, inject, signal } from '@angular/core';
import { MenuDpiComponent } from '../menu-dpi/menu-dpi.component';
import { CardComponent } from "./card/card.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { AddSoinFormComponent } from "./add-soin-form/add-soin-form.component";
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import SoinInfermier from '../../models/SoinInfermier';
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';
import { SoinsInfermiersService } from '../../services/soins-infermiers.service';
import { UserRoleService } from '../../services/user-role.service';

@Component({
  selector: 'app-soins-dpi',
  standalone: true,
  imports: [CardComponent, FontAwesomeModule, AddSoinFormComponent],
  templateUrl: './soins-dpi.component.html',
  styleUrl: './soins-dpi.component.css'
})
export class SoinsDpiComponent {
  soinsInfermiersService = inject(SoinsInfermiersService)

  faCirclePlus = faCirclePlus;
  addFormOpened = signal(false)

  

  openAddForm(event: Event) {
    event.stopPropagation()
    this.addFormOpened.set(true);
  }
  closeAddForm() {
    this.addFormOpened.set(false);
  }

  constructor(private route: ActivatedRoute, public userIndicatorService: UserIndicatorsServiceService, public userRoleService: UserRoleService) {}

  async ngOnInit() {
    
    this.userIndicatorService.loadingData.set({
      ...this.userIndicatorService.loadingData(),
      isLoading: true
    })

    this.soinsInfermiersService.dpiId = this.route.parent?.snapshot.paramMap.get('dpiId')!;
    try{
      const response = await axios.get('http://localhost:8000/traitements/soin-infirmier/search/?dossier='+this.soinsInfermiersService.dpiId,{
        headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('accessToken'),
          }  
        });

      if (response.status === 200) this.soinsInfermiersService.soinsInfermiers.set(response.data);
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des soins'
      })
      ;
    }
    catch(err){
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des soins'
      })
    }
    finally{
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: false
      })
    }
  }
}
