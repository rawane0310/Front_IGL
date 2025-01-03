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

@Component({
  selector: 'app-resultat',
  standalone: true,
  imports: [FontAwesomeModule, GraphiqueComponent, DeleteDialogComponent, AjouterResultatComponent],
  templateUrl: './resultat.component.html',
  styleUrl: './resultat.component.css'
})
export class ResultatComponent {
  resultatsAnalyseService = inject(ResultatAnalyseService)

  faTrashCan=faTrashCan
  faPenToSquare=faPenToSquare
  faPlusCircle=faPlusCircle
  faWandMagicSparkles=faWandMagicSparkles

  analyseId = input.required()

  graphiqueOpened = signal(false)
  deleteDialog = signal(false)
  modifyDialog = signal(false)
  addForm = signal(false)

  resultatAnalyse !: ResultatAnalyse
  deleteEndpoint !:string

  updatedIndices = signal<Set<number>>(new Set());
  
  commentaire = computed(() => {
    return new Array(this.resultatsAnalyseService.resultatsAnalyse().length).fill(false).map((_, index) => 
      this.updatedIndices().has(index) 
    );
  });

  constructor(public userIndicatorService: UserIndicatorsServiceService){}

  openGraphique(event: Event): void {
    event.stopPropagation();
    this.graphiqueOpened.set(true)
  }
  closeGraphique(): void {
    this.graphiqueOpened.set(false)
  }

  openDeleteDialog(event: Event, id: number): void {
    event.stopPropagation();
    this.resultatAnalyse.id = id
    this.deleteEndpoint = 'http://localhost:8000/examens/resultat_examen/'+id+'/'
    this.deleteDialog.set(true)
  }

  /**
   * Closes the delete dialog and sets the deleteDialog signal to false.
   *
   * @returns Nothing. This function is a void function.
   */
  closeDeleteDialog(id: number): void {
    this.resultatsAnalyseService.resultatsAnalyse.set(
      this.resultatsAnalyseService.resultatsAnalyse().filter(r => r.id!== id)
    )
    this.deleteDialog.set(false);
  }


  openModifyDialog(event: Event, resultat: ResultatAnalyse): void {
    event.stopPropagation();
    this.resultatAnalyse = resultat
    this.modifyDialog.set(true)
  }

  closeModifyDialog(){
    this.modifyDialog.set(false)
  }

  openAddForm(event: Event): void {
    event.stopPropagation();
    this.addForm.set(true)
  }

  closeAddForm(): void {
    this.addForm.set(false)
  }

  toggleCommentaire(index: number) {
    const currentIndices = this.updatedIndices();
    const updatedIndices = new Set(currentIndices); 

    if (updatedIndices.has(index)) updatedIndices.delete(index); 
    else updatedIndices.add(index); 
    
    this.updatedIndices.set(updatedIndices); 
  }
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
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des résultats'
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
