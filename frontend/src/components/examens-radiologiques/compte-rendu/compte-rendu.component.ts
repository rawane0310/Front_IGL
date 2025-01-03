import { Component, computed, inject, input, signal } from '@angular/core';
import { ExamenRadiologique, RadiologyImage } from '../../../models/Examen';
import { faPenToSquare, faTrashCan, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModifierCompteRenduComponent } from '../modifier-compte-rendu/modifier-compte-rendu.component';
import { RadiologyImagesService } from '../../../services/radiology-images.service';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import { ExamensRadiologiquesService } from '../../../services/examens-radiologiques.service';
import axios from 'axios';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { AjouterRadiologyImageComponent } from '../ajouter-radiology-image/ajouter-radiology-image.component';

@Component({
  selector: 'app-compte-rendu',
  standalone: true,
  imports: [FontAwesomeModule, ModifierCompteRenduComponent, DeleteDialogComponent, AjouterRadiologyImageComponent],
  templateUrl: './compte-rendu.component.html',
  styleUrl: './compte-rendu.component.css'
})
export class CompteRenduComponent {
  radiologyImagesService = inject(RadiologyImagesService)
  // examensRadiologiquesService = inject(ExamensRadiologiquesService)

  faPenToSquare=faPenToSquare
  faTrashCan=faTrashCan
  faPlusCircle=faPlusCircle

  examen = input.required<ExamenRadiologique>()
  modifyForm = signal(false)
  deleteImgDialog = signal(false)
  modifyImgDialog = signal(false)
  addForm = signal(false)

  imgId = signal(-1)
  deleteImgEndpoint = computed(()=>`
    http://localhost:8000/examens/radiology-images/${this.imgId()}/`
   )
  imageData = signal<RadiologyImage | undefined>(undefined)

  constructor(public userIndicatorService: UserIndicatorsServiceService){}


  openModifyForm(event: Event): void {
    event.stopPropagation()
    this.modifyForm.set(true)
  }

  closeModifyForm():void {
    this.modifyForm.set(false)
  }

  openDeleteImgDialog(event:Event, id:number):void {
    event.stopPropagation()
    this.imgId.set(id)
    this.deleteImgDialog.set(true)
  }

  closeDeleteImgDialog(id: number):void {
    this.radiologyImagesService.radiologyImages.set(
      this.radiologyImagesService.radiologyImages().filter(ri=>ri.id!==id)
    )
    this.deleteImgDialog.set(false)
  }

  openModifyImgDialog(event:Event, image: RadiologyImage):void {
    event.stopPropagation()
    this.imageData.set(image)
    this.modifyImgDialog.set(true)
  }

  closeModifyImgDialog():void {
    this.modifyImgDialog.set(false)
  }

  openAddForm(event:Event):void {
    event.stopPropagation()
    this.addForm.set(true)
  }

  closeAddForm():void {
    this.addForm.set(false)
  }
  async ngOnInit(): Promise<void>{
    try {
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: true
      })

      const response = await axios.get('http://localhost:8000/examens/radiology-images/?examen='+this.examen().id,{
        headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('accessToken'),
          }  
      });

      console.log(response.data);

      if (response.status === 200) this.radiologyImagesService.radiologyImages.set(response.data);
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des Images médicales'
      })

    }
    catch (error) {
      console.log(error);
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des Images médicales'
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
