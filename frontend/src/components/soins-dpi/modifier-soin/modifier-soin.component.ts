import { Component, inject, input, output } from '@angular/core';
import SoinInfermier from '../../../models/SoinInfermier';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import axios from 'axios';
import { SoinsInfermiersService } from '../../../services/soins-infermiers.service';

@Component({
  selector: 'app-modifier-soin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifier-soin.component.html',
  styleUrl: './modifier-soin.component.css'
})
export class ModifierSoinComponent {
  soinsInfermiersService = inject(SoinsInfermiersService)
  modifierSoinCloseEvent = output()

  soin = input.required<SoinInfermier>()
  formGroup ! :  FormGroup;

  constructor(public userIndicatorService: UserIndicatorsServiceService){}
  ngOnInit() {
    const soinValue = this.soin(); // Access the input value dynamically
    this.formGroup = new FormGroup({
      date: new FormControl(soinValue.date || '', [Validators.required]),
      heure: new FormControl(soinValue.heure || '',[Validators.required]),
      observation: new FormControl(soinValue.observation || '',[Validators.required]),
      soin_realise: new FormControl(soinValue.soin_realise || '',[Validators.required]),
      dossier: new FormControl(soinValue.dossier_id || ''),
      infirmier_id: new FormControl(soinValue.infirmier_id || ''),
    });
  }

  closeSoin(){
    this.modifierSoinCloseEvent.emit()
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    if (this.formGroup.valid) {
      console.log('Form submitted:', this.formGroup.value);

      try {
        this.userIndicatorService.loadingData.set({
          isLoading: true,
          loadingMessage: 'Modification en cours...'
        })
      
        const res = await axios.put('http://localhost:8000/traitements/soin-infirmier/'+this.soin().id+'/modify/',this.formGroup.value,{
          headers:{
            Authorization: 'Bearer '+localStorage.getItem('accessToken')
          }
        })

        console.log(res.data)
        if(res.status === 200){ 
          this.userIndicatorService.sucessData.set({
            isSuccess: true,
            successMessage: 'Soin modifié avec succès'
          }) 

          const updatedData = {
            date: this.formGroup.value.date,
            heure: this.formGroup.value.heure,
            observation: this.formGroup.value.observation,
            soin_realise: this.formGroup.value.soin_realise,
            dossier_id: this.formGroup.value.dossier,
            infirmier_id: this.formGroup.value.infirmier_id,
          }

          this.soinsInfermiersService.soinsInfermiers.set(
            this.soinsInfermiersService.soinsInfermiers().map(soin =>
              soin.id === this.soin().id ? { ...soin, ...updatedData } : soin
            )
          )
          
        }
        else this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la modification du soin'
        })
        
      } 
      catch (error) {
        console.log(error)
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la modification du soin'
        })
      }
      finally{
        this.userIndicatorService.loadingData.set({
          isLoading: false,
          loadingMessage: 'Chargement ...'
        })
        this.closeSoin();
      }
    } 
  }
}
