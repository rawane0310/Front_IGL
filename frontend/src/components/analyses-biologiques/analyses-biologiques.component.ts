import { Component, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { AnalysesBiologiquesService } from '../../services/analyses-biologiques.service';
import { ActivatedRoute } from '@angular/router';
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';
import axios from 'axios';

/**
 * Component for displaying biological analyses data.
 * Fetches data from the server and handles loading and error states.
 */

@Component({
  selector: 'app-analyses-biologiques',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './analyses-biologiques.component.html',
  styleUrl: './analyses-biologiques.component.css'
})
export class AnalysesBiologiquesComponent {

   /**
   * Service for managing biological analyses data.
   */

  analysesBiologiquesService = inject(AnalysesBiologiquesService)


  /**
   * Constructor to inject required services.
   * @param route ActivatedRoute to retrieve route parameters.
   * @param userIndicatorService Service to manage user indicators like loading and errors.
   */
  constructor(
    private route: ActivatedRoute,
    public userIndicatorService: UserIndicatorsServiceService
  ){}

  /**
   * Lifecycle hook to initialize the component.
   * Fetches biological analyses data from the server.
   */

  async ngOnInit(): Promise<void>{
    try {
      // Set loading state to true
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: true
      })

      // Retrieve the `dpiId` parameter from the parent route
      this.analysesBiologiquesService.dpiId = this.route.parent?.snapshot.paramMap.get('dpiId')!;
    
      // Make an HTTP request to fetch biological analyses data
      const response = await axios.get('http://localhost:8000/examens/search-examens-biologiques/?dossier='+this.analysesBiologiquesService.dpiId,{
        headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('accessToken'),
          }  
      });

      
      // Handle successful response
      if (response.status === 200) this.analysesBiologiquesService.AnalysesBiologiques.set(response.data);
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des analyses'
      })

    }
    catch (error) {
      
      // Handle errors
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des analyses'
      })
    }
    finally{
      // Reset loading state
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: false
      })
    }
  }

}
