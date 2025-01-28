import { Component,inject , signal } from '@angular/core';
import { MenuDpiComponent } from '../menu-dpi/menu-dpi.component';
import { MatDialog } from '@angular/material/dialog';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { AjouterConsultationComponent } from '../ajouter-consultation/ajouter-consultation.component';
import { ConsultationService } from '../../services/consultation.service';
import { UserIndicatorsServiceServiceService } from '../../services/user-indicators-service.service.service';
import { ConsultationDetailsComponent } from '../consultation-details/consultation-details.component';
import { ActivatedRoute } from '@angular/router';
import { AjouterExamenComponent } from '../ajouter-examen/ajouter-examen.component';
import axios from 'axios';
import { AjouterExamenBioComponent } from '../ajouter-examen-bio/ajouter-examen-bio.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-consultations-dpi',
  standalone: true,
  imports: [MenuDpiComponent , CommonModule],
  templateUrl: './consultations-dpi.component.html',
  styleUrl: './consultations-dpi.component.css'
})
export class ConsultationsDpiComponent {


  
  

  // recuperation des consultations

  consultationsService = inject(ConsultationService)

  faCirclePlus = faCirclePlus;
  addFormOpened = signal(false)

  

  openAddForm(event: Event) {
    event.stopPropagation()
    this.addFormOpened.set(true);
  }
  closeAddForm() {
    this.addFormOpened.set(false);
  }

  constructor(private route: ActivatedRoute, public userIndicatorService: UserIndicatorsServiceServiceService , private dialog: MatDialog) {}

  async ngOnInit() {
    
    this.userIndicatorService.loadingData.set({
      ...this.userIndicatorService.loadingData(),
      isLoading: true
    })

    this.consultationsService.dpiId = this.route.parent?.snapshot.paramMap.get('dpiId')!;
    try{
      const response = await axios.get('http://127.0.0.1:7000/consultations/consultation_by_dpi/?dpi=1',{
        headers: {
          'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxMDM3NTgyNzA0NywiaWF0IjoxNzM1OTEzNDQ3LCJqdGkiOiIzNjYxZTUzOTNmNDY0Y2FiOTgzNDRkNTc1NmI5ZDU4MiIsInVzZXJfaWQiOjExLCJyb2xlIjoidGVjaG5pY2llbiJ9.Fx8pjxnpHagNRzE7JfJByeNExgEhe6rJ6kjYmePEEvU',
          }  
        });

      if (response.status === 200) { this.consultationsService.consultations.set(response.data);
       console.log(response.data)}
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

 
  

  openDialog(consultation: any): void {
   
    // Open the dialog with the fetched details
    this.dialog.open(ConsultationDetailsComponent, {
      width: '1000px',
      height: '800px',
      data: {
        resumeId: consultation.resume,
        ordonnanceId: consultation.ordonnance,
        date: consultation.date,
        medecin: consultation.medecin,
        diagnostic: consultation.diagnostic
      }, 
      position: {
        top: '-65%',
        left: '10%',
      },
    });
  
}


  AjouterConsultation(): void {
    this.dialog.open(AjouterConsultationComponent, {
      width: '500px', // Adjust dialog width
      height: '500px', // Adjust dialog height
      position: {
        top: '-65%', // Adjust as needed
        left: '30%', // Adjust as needed
       
      },
      
     
    });

     
  
}

AjouterExamenRadio(): void {
  this.dialog.open(AjouterExamenComponent, {
    width: '800px', // Adjust dialog width
    height: '500px', // Adjust dialog height
    position: {
      top: '-65%', // Adjust as needed
      left: '30%', // Adjust as needed
     
    },
    
   
  });

   

}

AjouterExamenBio(): void {
  this.dialog.open(AjouterExamenBioComponent, {
    width: '800px', // Adjust dialog width
    height: '500px', // Adjust dialog height
    position: {
      top: '-65%', // Adjust as needed
      left: '30%', // Adjust as needed
     
    },
    
   
  });

   

}
}
