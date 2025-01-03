import { Component, input, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUser, faNotesMedical, faUserNurse, faChartBar, faBone} from '@fortawesome/free-solid-svg-icons'
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';
import axios from 'axios';

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
 faBone= faBone;

 dpiId = input.required()
 patientName = signal<string>('Patient')

  capitalizeFirstLetter(input: string): string {
    if (!input) return input; // Handle empty strings
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

 constructor(private route: ActivatedRoute, public userIndicatorService: UserIndicatorsServiceService){}
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
