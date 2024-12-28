import { Component, inject, input, output, signal } from '@angular/core';
import { MedicamentsComponent } from "../../medicaments/medicaments.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPenToSquare, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AjouterMedicamentComponent } from '../../ajouter-medicament/ajouter-medicament.component';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { ModifierSoinComponent } from "../../modifier-soin/modifier-soin.component";
import SoinInfermier from '../../../models/SoinInfermier';
import { SoinsInfermiersService } from '../../../services/soins-infermiers.service';

@Component({
  selector: 'app-soins-plus',
  standalone: true,
  imports: [MedicamentsComponent, FontAwesomeModule, DeleteDialogComponent, ModifierSoinComponent, AjouterMedicamentComponent],
  templateUrl: './soins-plus.component.html',
  styleUrl: './soins-plus.component.css'
})
export class SoinsPlusComponent {
  soinsInfermiersService = inject(SoinsInfermiersService)
  faTrashCan=faTrashCan
  faPenToSquare=faPenToSquare
  faPlusCircle=faPlusCircle

  closeEvent = output()
  activeMedicament = signal(false);
  ajouterMed = signal(false)

  soin= input.required<SoinInfermier>()
  deleteEndpoint !: string ;

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

  closeDeleteDialog(id: number){
    console.log("close delete dialog",id)
    this.soinsInfermiersService.soinsInfermiers.set(this.soinsInfermiersService.soinsInfermiers().filter(soin => soin.id !== id))
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

  openAjouterMedicament(event: Event){
    event.stopPropagation();
    this.ajouterMed.set(true)
  }

  closeAjouterMedicament(){
    this.ajouterMed.set(false)
  }

  ngOnInit():void{
    this.deleteEndpoint = 'http://localhost:8000/traitements/soin-infermier/'+this.soin().id+'/delete/'
  }

}
