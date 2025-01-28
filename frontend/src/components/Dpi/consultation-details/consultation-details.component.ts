import { Component , inject , Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ConsultationService } from '../../services/consultation.service';
import { ResumeServiceService } from '../../services/resume-service.service';
import { UserIndicatorsServiceServiceService } from '../../services/user-indicators-service.service.service';
import axios from 'axios';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-consultation-details',
  standalone: true,
  imports: [MatDialogModule , CommonModule],
  templateUrl: './consultation-details.component.html',
  styleUrl: './consultation-details.component.css'
})
export class ConsultationDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , public userIndicatorService: UserIndicatorsServiceServiceService) {}

  resumeData: any = null; // To store resume details
  ordonnanceData: any = null; // To store ordonnance details
  mesuresPrises: string = ''; // To hold the raw string from the backend
parsedMesures: string[] = []; // To hold the formatted key-value pairs





  async ngOnInit() {
    
    this.userIndicatorService.loadingData.set({
      ...this.userIndicatorService.loadingData(),
      isLoading: true
    })


   
      
  
    try {
      // Fetch resume data
      const resumeResponse = await axios.get(
        `http://127.0.0.1:7000/consultations/resume/search/?id=${this.data.resumeId}`,
        {
          headers: {
            'Authorization':  'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxMDM3NTgyNzA0NywiaWF0IjoxNzM1OTEzNDQ3LCJqdGkiOiIzNjYxZTUzOTNmNDY0Y2FiOTgzNDRkNTc1NmI5ZDU4MiIsInVzZXJfaWQiOjExLCJyb2xlIjoidGVjaG5pY2llbiJ9.Fx8pjxnpHagNRzE7JfJByeNExgEhe6rJ6kjYmePEEvU',
          },
        }
      );
      console.log(resumeResponse)
      this.resumeData = resumeResponse.data[0];
        // Parse mesures_prises string if it exists
    
        this.parsedMesures = this.parseMesures(this.resumeData.mesures_prises);
     
      // Fetch ordonnance data
      const ordonnanceResponse = await axios.get(
        `http://127.0.0.1:7000/traitements/medicament/search/?ordonnance=${this.data.ordonnanceId}`,
        {
          headers: {
            'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxMDM3NTgyNzA0NywiaWF0IjoxNzM1OTEzNDQ3LCJqdGkiOiIzNjYxZTUzOTNmNDY0Y2FiOTgzNDRkNTc1NmI5ZDU4MiIsInVzZXJfaWQiOjExLCJyb2xlIjoidGVjaG5pY2llbiJ9.Fx8pjxnpHagNRzE7JfJByeNExgEhe6rJ6kjYmePEEvU',
          },
        }
      );
      console.log(ordonnanceResponse)
      this.ordonnanceData = ordonnanceResponse.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  parseMesures(mesuresPrises: string): string[] {
    if (!mesuresPrises) return []; // Handle null or undefined inputs
  
    const mesures = mesuresPrises.split(',');
  
    return mesures.map((mesure) => {
      const parts = mesure.split(':');
      if (parts.length === 2) {
        const [key, value] = parts;
        return `${key.trim()} : ${value.trim()}`;
      } else if (parts.length === 1) {
        return `${parts[0].trim()}`; // Treat as label if no colon
      }
      return null; // For completely invalid entries
    }).filter((entry) => entry !== null); // Remove invalid entries
  }
  
 
}

   


