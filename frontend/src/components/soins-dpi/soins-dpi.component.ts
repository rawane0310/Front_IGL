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


/**
 * The `SoinsDpiComponent` is responsible for displaying and managing the nurse's care (soins) within a specific dossier
 * (DPI) context. It fetches soins related to a DPI, allows opening and closing of the "Add Soin" form, and manages error and loading states.
 * 
 * @component
 * 
 * @property {Signal<boolean>} addFormOpened - A signal to control the visibility of the "Add Soin" form.
 * @property {string} faCirclePlus - FontAwesome icon for adding new soins.
 * @property {SoinsInfermiersService} soinsInfermiersService - The service managing soins-related data for the DPI.
 * 
 * @method openAddForm - Opens the "Add Soin" form.
 * @method closeAddForm - Closes the "Add Soin" form.
 * @method ngOnInit - Initializes the component, fetches soins data based on the DPI ID from the route, and handles loading and error states.
 */
@Component({
  selector: 'app-soins-dpi',
  standalone: true,
  imports: [CardComponent, FontAwesomeModule, AddSoinFormComponent],
  templateUrl: './soins-dpi.component.html',
  styleUrl: './soins-dpi.component.css'
})
export class SoinsDpiComponent {


  /**
   * The service managing soins-related data.
   * @type {SoinsInfermiersService}
   */
  soinsInfermiersService = inject(SoinsInfermiersService)


  /**
   * FontAwesome icon for adding new soins.
   * @type {IconDefinition}
   */
  faCirclePlus = faCirclePlus;


  /**
   * A signal to track the visibility of the "Add Soin" form.
   * @type {Signal<boolean>}
   */
  addFormOpened = signal(false)

  

  /**
   * Opens the "Add Soin" form.
   * 
   * @param {Event} event - The event triggered by the user interaction.
   */
  openAddForm(event: Event) {
    event.stopPropagation()
    this.addFormOpened.set(true);
  }


  /**
   * Closes the "Add Soin" form.
   */
  closeAddForm() {
    this.addFormOpened.set(false);
  }

  /**
   * The constructor for `SoinsDpiComponent`. It injects necessary services for route handling, user indicators, and user roles.
   * 
   * @param {ActivatedRoute} route - The Angular route service for accessing route parameters.
   * @param {UserIndicatorsServiceService} userIndicatorService - The service managing loading and error states.
   * @param {UserRoleService} userRoleService - The service managing user roles.
   */
  constructor(
    private route: ActivatedRoute, 
    public userIndicatorService: UserIndicatorsServiceService, 
    public userRoleService: UserRoleService
  ) {}


  /**
   * Initializes the component. Fetches soins related to the current DPI ID from the route and updates the service.
   * Handles loading and error states during the API call.
   */
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
