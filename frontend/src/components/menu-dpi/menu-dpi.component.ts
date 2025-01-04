import { Component, input, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUser, faNotesMedical, faUserNurse, faChartBar, faBone} from '@fortawesome/free-solid-svg-icons'
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';
import axios from 'axios';


/**
 * Component representing the menu for DPI (Dossier Patient Informatique).
 * Provides navigation options and displays the patient's name.
 */
@Component({
  selector: 'app-menu-dpi',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './menu-dpi.component.html',
  styleUrls: ['./menu-dpi.component.css'] 
})
export class MenuDpiComponent {
  /**
   * FontAwesome icon representing a user.
   * Typically used for user-related menu items.
   */
  faUser = faUser;

  /**
   * FontAwesome icon representing medical notes.
   * Used for menu items related to patient medical records.
   */
  faNotesMedical = faNotesMedical;

  /**
   * FontAwesome icon representing a nurse or medical staff.
   * Used for menu items related to healthcare professionals.
   */
  faUserNurse = faUserNurse;

  /**
   * FontAwesome icon representing a chart or statistical data.
   * Used for menu items related to analytics or reports.
   */
  faChartBar = faChartBar;

  /**
   * FontAwesome icon representing a bone.
   * Used for menu items related to radiological studies.
   */
  faBone = faBone;

  /**
   * ID of the patient's dossier.
   * Passed as an input to the component.
   */
  dpiId = input.required()

  /**
   * Signal holding the patient's name.
   * Defaults to 'Patient'.
   */
  patientName = signal<string>('Patient')


  /**
   * Capitalizes the first letter of a string.
   * @param input - The string to capitalize.
   * @returns The string with the first letter capitalized.
   */
  capitalizeFirstLetter(input: string): string {
    if (!input) return input; // Handle empty strings
    return input.charAt(0).toUpperCase() + input.slice(1);
  }


  /**
   * Constructor for injecting dependencies.
   * @param userIndicatorService - Service for handling user indicators like loading and error states.
   */
  constructor( 
    public userIndicatorService: UserIndicatorsServiceService
  ){}


  /**
   * On initialization, fetches the patient's name based on the provided dpiId.
   * Updates the loading state and handles potential errors during the data fetch.
   */
  async ngOnInit(): Promise<void> {
    try {
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: true
      })

      
      const response = await axios.get('http://localhost:8000/dpi/search-patient/'+this.dpiId()+'/',{
        headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('accessToken'),
          }  
      });

      console.log(response.data);

      if (response.status === 200) this.patientName.set( this.capitalizeFirstLetter(response.data.nom)+' '+this.capitalizeFirstLetter(response.data.prenom));
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des données du patient'
      })

    }
    catch (error) {
      console.log(error);
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des données du patient'
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
