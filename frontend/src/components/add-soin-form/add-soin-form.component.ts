import { Component, output, signal } from '@angular/core';
import { MedicamentsComponent } from "../medicaments/medicaments.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AjouterMedicamentComponent } from "../ajouter-medicament/ajouter-medicament.component";

@Component({
  selector: 'app-add-soin-form',
  standalone: true,
  imports: [MedicamentsComponent, FontAwesomeModule, AjouterMedicamentComponent],
  templateUrl: './add-soin-form.component.html',
  styleUrl: './add-soin-form.component.css'
})
export class AddSoinFormComponent {
  faPlusCircle=faPlusCircle
  closeEvent = output()
  next = signal(false)
  ajouterMed = signal(false)
  closeAddSoin(){
    this.closeEvent.emit() ;
  }

  nextStep(event: Event){
    event.stopPropagation();
    this.next.set(true)
  }

  openAjouterMedicament(event: Event){
    event.stopPropagation();
    this.ajouterMed.set(true)
  }

  closeAjouterMedicament(){
    this.ajouterMed.set(false)
  }

}
