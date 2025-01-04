import { Component, inject, input, output } from '@angular/core';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResultatAnalyse } from '../../../models/Examen';
import axios, { AxiosError } from 'axios';
import { ResultatAnalyseService } from '../../../services/resultat-analyse.service';

/**
 * Component responsible for adding or modifying the biological analysis result.
 * This component includes functionality for form validation, interacting with
 * APIs for result submission, and emitting events for dialog interactions.
 * @component
 */
@Component({
  selector: 'app-ajouter-resultat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ajouter-resultat.component.html',
  styleUrl: './ajouter-resultat.component.css'
})
export class AjouterResultatComponent {

  /**
   * Service for managing result data, injected via the constructor.
   * 
   * @private
   * @type {ResultatAnalyseService}
   */
  resultatAnalyseService = inject(ResultatAnalyseService)

  /**
   * The ID of the analysis for which the result is being added or modified.
   * 
   * @input
   * @type {string}
   */
  analyseId = input.required()

   /**
   * Event emitted when the dialog for adding a result is closed.
   * 
   * @output
   */
  closeEvent = output()

  /**
   * The result data that is being modified, if applicable.
   * 
   * @input
   * @type {ResultatAnalyse | undefined}
   */
  resultat = input<ResultatAnalyse>()

  /**
   * The form group to handle user input for the result. It includes fields like 
   * "parametre", "valeur", "unite", and "commentaire".
   * 
   * @type {FormGroup}
   */
  formGroup! : FormGroup;

  /**
   * Injects the necessary services for user indicators and result data management.
   * @constructor
   * @param {UserIndicatorsServiceService} userIndicatorsService Service for managing user indicators like loading and errors.
   */
  constructor(
    public userIndicatorsService: UserIndicatorsServiceService
  ){}


  /**
   * Initializes the form group with default values or the values from the current 
   * result (if modifying an existing result).
   * 
   * @public
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(){
    this.formGroup = new FormGroup({
      parametre : new FormControl(this.resultat()?.parametre || '' , [Validators.required]),
      valeur : new FormControl(this.resultat()?.valeur || '' , [Validators.required]),
      unite : new FormControl(this.resultat()?.unite || '' , [Validators.required]),
      commentaire : new FormControl(this.resultat()?.commentaire || '' , [Validators.required]),
      examen_biologique: new FormControl(this.analyseId(), [Validators.required]),
      laborantin: new FormControl(localStorage.getItem('technicianID'), [Validators.required])
    });
  }


   /**
   * Emits the closeEvent to signal the closure of the add result dialog.
   * 
   * @public
   * @method closeAdd
   * @returns {void}
   */
  closeAdd(): void{
    this.closeEvent.emit()
  }

  /**
   * Sends a request to the server to add a new result for the biological examination.
   * Displays loading, success, and error indicators accordingly.
   * 
   * @public
   * @async
   * @method addResultat
   * @returns {Promise<void>}
   */
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

  /**
   * Sends a request to the server to modify an existing result for the biological examination.
   * Displays loading, success, and error indicators accordingly.
   * 
   * @public
   * @async
   * @method modifyResultat
   * @returns {Promise<void>}
   */
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

    /**
   * Handles the form submission to either add a new result or modify an existing result,
   * based on the presence of existing data in the `resultat` property.
   * 
   * @public
   * @async
   * @method onSubmit
   * @param {Event} event The form submission event.
   * @returns {Promise<void>}
   */
  async onSubmit(event: Event): Promise<void>{
    console.log(this.formGroup.value)
    if(this.formGroup.valid){
      if(this.resultat()) await this.modifyResultat()
      else await this.addResultat()
    }
  }

}
