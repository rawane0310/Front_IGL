import { Component, output } from '@angular/core';

@Component({
  selector: 'app-ajouter-medicament',
  standalone: true,
  imports: [],
  templateUrl: './ajouter-medicament.component.html',
  styleUrl: './ajouter-medicament.component.css'
})
export class AjouterMedicamentComponent {
  ajouterMedCloseEvent = output()
  closeAjouterMed(){
    this.ajouterMedCloseEvent.emit()
  }

}
