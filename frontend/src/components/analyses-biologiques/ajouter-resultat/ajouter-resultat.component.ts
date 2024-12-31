import { Component, inject, input, output } from '@angular/core';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResultatAnalyse } from '../../../models/Examen';
import axios, { AxiosError } from 'axios';
import { ResultatAnalyseService } from '../../../services/resultat-analyse.service';

@Component({
  selector: 'app-ajouter-resultat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ajouter-resultat.component.html',
  styleUrl: './ajouter-resultat.component.css'
})
export class AjouterResultatComponent {
  resultatAnalyseService = inject(ResultatAnalyseService)

  analyseId = input.required()
  closeEvent = output()
  resultat = input<ResultatAnalyse>()
  formGroup! : FormGroup;

  constructor(public userIndicatorsService: UserIndicatorsServiceService){}


  ngOnInit(){
    this.formGroup = new FormGroup({
      parametre : new FormControl(this.resultat()?.parametre || '' , [Validators.required]),
      valeur : new FormControl(this.resultat()?.valeur || '' , [Validators.required]),
      unite : new FormControl(this.resultat()?.unite || '' , [Validators.required]),
      commentaire : new FormControl(this.resultat()?.commentaire || '' , [Validators.required]),
      examen_biologique: new FormControl(this.analyseId(), [Validators.required])
    });
  }

  closeAdd(): void{
    this.closeEvent.emit()
  }

  async addResultat(): Promise<void>{
    try {
      this.userIndicatorsService.loadingData.set({
        isLoading: true,
        loadingMessage: 'Ajout en cours...'
      });
      
      const res = await axios.post('http://localhost:8000/examens/resultats_examens/',this.formGroup.value,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem('accessToken')
        }
      })

      console.log(res.data)
      
      if(res.status === 201){
        const upadtedData = this.resultatAnalyseService.resultatsAnalyse()
        upadtedData.push(res.data)
        this.resultatAnalyseService.resultatsAnalyse.set(upadtedData)

        this.userIndicatorsService.sucessData.set({
          isSuccess: true,
          successMessage: 'Résultat ajouté avec succès'
        })
      }
      else this.userIndicatorsService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la création du résultat'
      })
    }
    catch (error: unknown) {
      console.log(error)
      const axiosError = error as AxiosError;
      if (axiosError.response?.data &&
         typeof axiosError.response.data === 'object'
          && 'non_field_errors' in axiosError.response.data
          && (axiosError.response.data as any).non_field_errors[0] === "The fields parametre, examen_biologique must make a unique set.")
        this.userIndicatorsService.errorData.set({
          isError: true,
          errorMessage: 'Ce résultat existe déjà pour cet examen'
        })

      else this.userIndicatorsService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la création du résultat'
      })
    }
    finally{
      this.userIndicatorsService.loadingData.set({
        isLoading: false,
        loadingMessage: 'Chargement...'
      });
      this.closeAdd();
    }
  }

  async modifyResultat(): Promise<void>{
    try {
      this.userIndicatorsService.loadingData.set({
        isLoading: true,
        loadingMessage: 'Modification en cours...'
      });
      console.log(this.resultatAnalyseService.resultatsAnalyse())

      const res = await axios.put('http://localhost:8000/examens/resultat_examen/'+this.resultat()?.id+'/',this.formGroup.value,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem('accessToken')
        }
      })

      console.log(res.data)
      
      if(res.status === 200){
        const updatedData = this.resultatAnalyseService.resultatsAnalyse().filter(result => result.id !== this.resultat()?.id);  
        updatedData.push(res.data);  
        this.resultatAnalyseService.resultatsAnalyse.set(updatedData);  

        this.userIndicatorsService.sucessData.set({
          isSuccess: true,
          successMessage: 'Résultat modifié avec succès'
        })
      }
      else this.userIndicatorsService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la Modification du résultat'
      })
    }
    catch (error: unknown) {
      console.log(error)
      console.log(this.resultatAnalyseService.resultatsAnalyse())
      const axiosError = error as AxiosError;
      if (axiosError.response?.data &&
         typeof axiosError.response.data === 'object'
          && 'non_field_errors' in axiosError.response.data
          && (axiosError.response.data as any).non_field_errors[0] === "The fields parametre, examen_biologique must make a unique set.")
        this.userIndicatorsService.errorData.set({
          isError: true,
          errorMessage: 'Ce résultat existe déjà pour cet examen'
        })
        
      else this.userIndicatorsService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la Modification du résultat'
      })
      console.log(this.resultatAnalyseService.resultatsAnalyse())
    }
    finally{
      this.userIndicatorsService.loadingData.set({
        isLoading: false,
        loadingMessage: 'Chargement...'
      });
      this.closeAdd();
    }
  }

  async onSubmit(event: Event): Promise<void>{
    console.log(this.formGroup.value)
    if(this.formGroup.valid){
      if(this.resultat()) await this.modifyResultat()
      else await this.addResultat()
    }
  }

}
