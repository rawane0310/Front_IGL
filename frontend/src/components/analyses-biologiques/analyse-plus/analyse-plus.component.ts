import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPenToSquare, faPlusCircle, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { AnalyseBiologique } from '../../../models/Examen';
import { ModifierAnalyseComponent } from '../modifier-analyse/modifier-analyse.component';
import { ResultatComponent } from '../resultat/resultat.component';
import { AjouterResultatComponent } from '../ajouter-resultat/ajouter-resultat.component';
import { AnalysesBiologiquesService } from '../../../services/analyses-biologiques.service';
import { UserRoleService } from '../../../services/user-role.service';

@Component({
  selector: 'app-analyse-plus',
  standalone: true,
  imports: [FontAwesomeModule, DeleteDialogComponent, ModifierAnalyseComponent, ResultatComponent, AjouterResultatComponent],
  templateUrl: './analyse-plus.component.html',
  styleUrl: './analyse-plus.component.css'
})
export class AnalysePlusComponent {
  analysesBiologiquesService = inject(AnalysesBiologiquesService)
  faTrashCan=faTrashCan
  faPenToSquare=faPenToSquare
  faPlusCircle=faPlusCircle
  faWandMagicSparkles=faWandMagicSparkles

  closeEvent = output()
  active = signal(0)
  deleteDialog = signal(false)
  modifyDialog = signal(false)
  ajouterResultat= signal(false)
 
  constructor(public userRoleService: UserRoleService) { }

  analyse = input.required<AnalyseBiologique>()
  deleteEndpoint= computed(()=>{
    return "http://localhost:8000/examens/examen_biologique/"+this.analyse().id+"/"
  }) 
  resultatPret = computed(()=>{
    return this.analyse().laborantin !== null
  })
  closeAnalyse(): void{
    this.closeEvent.emit();
  }

  setActive(event: Event,tabIndex: number): void {
    event.stopPropagation();
    this.active.set(tabIndex)
  }

  openDeleteDialog(event: Event): void {
    event.stopPropagation();
    this.deleteDialog.set(true)
  }

  /**
   * Closes the delete dialog and sets the deleteDialog signal to false.
   *
   * @returns Nothing. This function is a void function.
   */
  closeDeleteDialog(id: number): void {
    this.analysesBiologiquesService.AnalysesBiologiques.set(this.analysesBiologiquesService.AnalysesBiologiques().filter(analyse => analyse.id !== id))
    this.deleteDialog.set(false);
  }


  openModifyDialog(event: Event): void {
    event.stopPropagation();
    this.modifyDialog.set(true)
  }

  closeModifyDialog(){
    this.modifyDialog.set(false)
  }

  openAjouterResultat(event: Event): void {
    event.stopPropagation();
    this.ajouterResultat.set(true)
  }

  closeAjouterResultat(): void {
    this.ajouterResultat.set(false)
  }

}
