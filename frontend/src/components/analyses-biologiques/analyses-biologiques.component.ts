import { Component, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { AnalysesBiologiquesService } from '../../services/analyses-biologiques.service';
import { ActivatedRoute } from '@angular/router';
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';
import axios from 'axios';

@Component({
  selector: 'app-analyses-biologiques',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './analyses-biologiques.component.html',
  styleUrl: './analyses-biologiques.component.css'
})
export class AnalysesBiologiquesComponent {
  analysesBiologiquesService = inject(AnalysesBiologiquesService)

  constructor(private route: ActivatedRoute, public userIndicatorService: UserIndicatorsServiceService){}

  async ngOnInit(): Promise<void>{
    try {
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: true
      })

      this.analysesBiologiquesService.dpiId = this.route.parent?.snapshot.paramMap.get('dpiId')!;
      const response = await axios.get('http://localhost:8000/examens/search-examens-biologiques/?dossier='+this.analysesBiologiquesService.dpiId,{
        headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('accessToken'),
          }  
      });

      console.log(response.data);

      if (response.status === 200) this.analysesBiologiquesService.AnalysesBiologiques.set(response.data);
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des analyses'
      })

    }
    catch (error) {
      console.log(error);
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des analyses'
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
