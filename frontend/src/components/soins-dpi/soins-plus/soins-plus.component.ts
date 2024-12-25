import { Component, input, output, signal } from '@angular/core';
import { MedicamentsComponent } from "../../medicaments/medicaments.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AjouterMedicamentComponent } from '../../ajouter-medicament/ajouter-medicament.component';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { ModifierSoinComponent } from "../../modifier-soin/modifier-soin.component";

@Component({
  selector: 'app-soins-plus',
  standalone: true,
  imports: [MedicamentsComponent, FontAwesomeModule, AjouterMedicamentComponent, DeleteDialogComponent, ModifierSoinComponent],
  templateUrl: './soins-plus.component.html',
  styleUrl: './soins-plus.component.css'
})
export class SoinsPlusComponent {
  faTrashCan=faTrashCan
  faPenToSquare=faPenToSquare
  closeEvent = output()
  activeMedicament = signal(false);

  soinForm = signal(false)
  deleteDialog = signal(false)

  openSoinForm(event: Event){
    event.stopPropagation()
    this.soinForm.set(true)
  }

  closeSoinForm(){
    this.soinForm.set(false)
  }

  opendeleteDialog(event: Event){
    event.stopPropagation()
    this.deleteDialog.set(true)
  }

  closeDeleteDialog(){
    this.deleteDialog.set(false)
  }
  closeSoin(){
    this.closeEvent.emit() ;
  }

  setActive(event: Event){
    event.stopPropagation();
    this.activeMedicament.set(true)
  }
  unSetActive(event: Event){
    event.stopPropagation();
    this.activeMedicament.set(false)
  }

}
