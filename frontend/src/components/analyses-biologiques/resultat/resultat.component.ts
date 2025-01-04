import { Component, computed, inject, input, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPenToSquare, faPlusCircle, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { GraphiqueComponent } from '../graphique/graphique.component';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { ResultatAnalyseService } from '../../../services/resultat-analyse.service';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import axios from 'axios';
import { AjouterResultatComponent } from '../ajouter-resultat/ajouter-resultat.component';
import { ResultatAnalyse } from '../../../models/Examen';
import { UserRoleService } from '../../../services/user-role.service';


/**
 * Component to manage and display results of biological analyses.
 * Allows modification, deletion, and viewing of graphical data related to results.
 */
@Component({
  selector: 'app-resultat',
  standalone: true,
  imports: [FontAwesomeModule, GraphiqueComponent, DeleteDialogComponent, AjouterResultatComponent],
  templateUrl: './resultat.component.html',
  styleUrl: './resultat.component.css'
})
export class ResultatComponent {

   /**
   * Injected service for handling biological analysis results.
   */
  resultatsAnalyseService = inject(ResultatAnalyseService)

  /**
   * Icons for UI actions
   */
  faTrashCan=faTrashCan
  faPenToSquare=faPenToSquare
  faPlusCircle=faPlusCircle
  faWandMagicSparkles=faWandMagicSparkles


  /**
   * The ID of the biological analysis being referenced in the component.
   * This ID is used to fetch and manipulate data related to a specific biological analysis.
   */
  analyseId = input.required();

  /**
   * The ID of the laborant (laboratory technician) involved with the biological analysis.
   * This ID is used to associate the analysis with a specific laborant in the system.
   */
  laborantinId = input.required<number>();


  /**
   * Signal to manage the visibility of the graphical view dialog.
   * When set to true, the graphical view dialog will be displayed.
   */
  graphiqueOpened = signal(false);

  /**
   * Signal to manage the visibility of the delete confirmation dialog.
   * When set to true, the delete dialog will be displayed for confirming deletion.
   */
  deleteDialog = signal(false);

  /**
   * Signal to manage the visibility of the modify dialog.
   * When set to true, the modify dialog will be displayed to allow modifying the analysis.
   */
  modifyDialog = signal(false);

  /**
   * Signal to manage the visibility of the add form.
   * When set to true, the add form will be displayed for adding a new result.
   */
  addForm = signal(false);

  /**
   * Holds the result to be modified or deleted.
   */
  resultatAnalyse !: ResultatAnalyse


  /**
   * Endpoint URL for deleting the result.
   */
  deleteEndpoint !:string


  /**
   * A signal to track which indices have been updated.
   */
  updatedIndices = signal<Set<number>>(new Set());


   /**
   * Computes an array of booleans indicating whether a specific result index has been updated.
   */
  commentaire = computed(() => {
    return new Array(this.resultatsAnalyseService.resultatsAnalyse().length).fill(false).map((_, index) => 
      this.updatedIndices().has(index) 
    );
  });



  /**
   * Constructor to inject the required services.
   * @param userIndicatorService Service to handle user notifications like loading and error messages.
   * @param userRoleService Service for handling user roles.
   */
  constructor(
    public userIndicatorService: UserIndicatorsServiceService, 
    public userRoleService: UserRoleService
  ){}



  /**
   * Opens the graphical view for a specific analysis result.
   * @param event The triggering event for opening the graphical view.
   */
  openGraphique(event: Event): void {
    event.stopPropagation();
    this.graphiqueOpened.set(true)
  }


  /**
   * Closes the graphical view.
   */
  closeGraphique(): void {
    this.graphiqueOpened.set(false)
  }


  /**
   * Opens the delete dialog for a specific result.
   * @param event The triggering event for opening the delete dialog.
   * @param id The ID of the result to be deleted.
   */
  openDeleteDialog(event: Event, id: number): void {
    event.stopPropagation();
    this.resultatAnalyse.id = id
    this.deleteEndpoint = 'http://localhost:8000/examens/resultat_examen/'+id+'/'
    this.deleteDialog.set(true)
  }


  /**
   * Closes the delete dialog and removes the result from the local service.
   * @param id The ID of the result that was deleted.
   */
  closeDeleteDialog(id: number): void {
    this.resultatsAnalyseService.resultatsAnalyse.set(
      this.resultatsAnalyseService.resultatsAnalyse().filter(r => r.id!== id)
    )
    this.deleteDialog.set(false);
  }


  /**
   * Opens the modify dialog for editing a specific result.
   * @param event The triggering event for opening the modify dialog.
   * @param resultat The result to be modified.
   */
  openModifyDialog(event: Event, resultat: ResultatAnalyse): void {
    event.stopPropagation();
    this.resultatAnalyse = resultat
    this.modifyDialog.set(true)
  }


  /**
   * Closes the modify dialog without making any changes.
   */
  closeModifyDialog(){
    this.modifyDialog.set(false)
  }


  /**
   * Opens the form to add a new result.
   * @param event The triggering event for opening the form.
   */
  openAddForm(event: Event): void {
    event.stopPropagation();
    this.addForm.set(true)
  }


  /**
   * Closes the form for adding a new result.
   */
  closeAddForm(): void {
    this.addForm.set(false)
  }


  /**
   * Toggles the updated status for a specific comment index.
   * @param index The index of the result whose comment status is being toggled.
   */
  toggleCommentaire(index: number) {
    const currentIndices = this.updatedIndices();
    const updatedIndices = new Set(currentIndices); 

    if (updatedIndices.has(index)) updatedIndices.delete(index); 
    else updatedIndices.add(index); 
    
    this.updatedIndices.set(updatedIndices); 
  }

  
  /**
   * Fetches the results of a biological analysis from the backend API and sets the data in the service.
   * This is called when the component is initialized.
   */
  async ngOnInit():Promise<void> {
    try {
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: true
      })
      
      const response = await axios.get('http://localhost:8000/examens/search-resultat-biologique/?idExamenBio='+this.analyseId(),{
        headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('accessToken'),
          }  
      });

      console.log(response.data);

      if (response.status === 200) this.resultatsAnalyseService.resultatsAnalyse.set(response.data);
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des résultats'
      })

    }
    catch (error) {
      console.log(error);
      if(axios.isAxiosError(error) && error.response?.status === 404 ){
        this.resultatsAnalyseService.resultatsAnalyse.set([])
      }
      else{
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la récupération des résultats'
        })
      }
    }
    finally{
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: false
      })
    }
  }

}
