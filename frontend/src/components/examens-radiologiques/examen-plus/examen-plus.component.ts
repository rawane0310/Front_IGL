import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPenToSquare, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { ExamenRadiologique } from '../../../models/Examen';
import { ExamensRadiologiquesService } from '../../../services/examens-radiologiques.service';
import { ModifierExamenComponent } from '../modifier-examen/modifier-examen.component';
import { CompteRenduComponent } from '../compte-rendu/compte-rendu.component';
import { AjouterCompteRenduComponent } from "../ajouter-compte-rendu/ajouter-compte-rendu.component";

@Component({
  selector: 'app-examen-plus',
  standalone: true,
  imports: [FontAwesomeModule, DeleteDialogComponent, ModifierExamenComponent, CompteRenduComponent, AjouterCompteRenduComponent],
  templateUrl: './examen-plus.component.html',
  styleUrl: './examen-plus.component.css'
})

export class ExamenPlusComponent {
  examensRadiologiquesSevice= inject(ExamensRadiologiquesService)

  faTrashCan=faTrashCan
  faPenToSquare=faPenToSquare
  faPlusCircle=faPlusCircle

  examen = input.required<ExamenRadiologique>()
  resultatPret = computed(()=>{
    return this.examen().radiologue !== null
  })
  deleteEndpoint= computed(()=>{
    return "http://localhost:8000/examens/examen_radiologique/"+this.examen().id+"/"
  })
  addCompteRendu = signal(false)

  closeEvent = output()
  active = signal(0)
  deleteDialog = signal(false)
  modifyDialog = signal(false)

  closeExamen(): void{
    this.closeEvent.emit();
  }

  setActive(event: Event,tabIndex: number): void {
    event.stopPropagation();
    this.active.set(tabIndex)
  }

  opendeleteDialog(event: Event): void {
    event.stopPropagation();
    this.deleteDialog.set(true)
  }

  /**
   * Closes the delete dialog and sets the deleteDialog signal to false.
   *
   * @returns Nothing. This function is a void function.
   */
  closeDeleteDialog(id: number): void {
    this.examensRadiologiquesSevice.examensRadiologiques.set(
      this.examensRadiologiquesSevice.examensRadiologiques().filter(e=>e.id!==id)
    )
    this.deleteDialog.set(false);
  }

  openModifyDialog(event: Event){
   event.stopPropagation() 
   this.modifyDialog.set(true)  
  }

  closeModifyDialog(){
    this.modifyDialog.set(false)  
  }

  openAddCompteRendu(event: Event){
    event.stopPropagation()
    this.addCompteRendu.set(true)
  }

  closeAddCompteRendu(){
    this.addCompteRendu.set(false)
  }
  
}
