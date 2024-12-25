import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AjouterMedicamentComponent } from "../ajouter-medicament/ajouter-medicament.component";
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-medicaments',
  standalone: true,
  imports: [FontAwesomeModule, AjouterMedicamentComponent, DeleteDialogComponent],
  templateUrl: './medicaments.component.html',
  styleUrl: './medicaments.component.css'
})
export class MedicamentsComponent {
  faTrashCan=faTrashCan
  faPenToSquare=faPenToSquare

  medForm = signal(false)
  deleteDialog = signal(false)

  openMedForm(event: Event){
    event.stopPropagation()
    this.medForm.set(true)
  }

  closeMedForm(){
    this.medForm.set(false)
  }

  opendeleteDialog(event: Event){
    event.stopPropagation()
    this.deleteDialog.set(true)
  }

  closeDeleteDialog(){
    this.deleteDialog.set(false)
  }
}

