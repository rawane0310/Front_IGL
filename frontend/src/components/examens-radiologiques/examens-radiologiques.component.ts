import { Component, inject } from '@angular/core';
import { CardComponent } from "./card/card.component";
import { ExamensRadiologiquesService } from '../../services/examens-radiologiques.service';
import { ActivatedRoute } from '@angular/router';
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';
import axios from 'axios';


/**
 * The ExamensRadiologiquesComponent fetches and displays a list of radiological exams 
 * related to a particular patient, using the patient's dossier ID (`dpiId`).
 */
@Component({
  selector: 'app-examens-radiologiques',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './examens-radiologiques.component.html',
  styleUrl: './examens-radiologiques.component.css'
})
export class ExamensRadiologiquesComponent {

  /**
  * Inject the ExamensRadiologiquesService to manage and retrieve radiological exams data.
  */
  examensRadiologiquesService = inject(ExamensRadiologiquesService)


  /**
   * Constructor for the ExamensRadiologiquesComponent.
   * 
   * @param route - ActivatedRoute to access route parameters
   * @param userIndicatorService - Service to handle loading, success, and error indicators
   */
  constructor(
    private route: ActivatedRoute, 
    public userIndicatorService: UserIndicatorsServiceService
  ){}


  /**
   * ngOnInit lifecycle hook that is triggered when the component is initialized.
   * It fetches the radiological exams data and handles loading, success, and error states.
   */
  async ngOnInit(): Promise<void>{
    try {
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: true
      })

      this.examensRadiologiquesService.dpiId = this.route.parent?.snapshot.paramMap.get('dpiId')!;
      const response = await axios.get('http://localhost:8000/examens/search-examens-radiologiques/?dossier='+this.examensRadiologiquesService.dpiId,{
        headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('accessToken'),
          }  
      });

      console.log(response.data);

      if (response.status === 200) this.examensRadiologiquesService.examensRadiologiques.set(response.data);
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des examens'
      })

    }
    catch (error) {
      console.log(error);
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des examens'
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
