import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamenRadiologique, RadiologyImage } from '../../../models/Examen';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import { ExamensRadiologiquesService } from '../../../services/examens-radiologiques.service';
import axios from 'axios';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import  {faPlusCircle, faTrashCan, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { RadiologyImagesService } from '../../../services/radiology-images.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { AjouterRadiologyImageComponent } from '../ajouter-radiology-image/ajouter-radiology-image.component';

@Component({
  selector: 'app-ajouter-compte-rendu',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, DeleteDialogComponent, AjouterRadiologyImageComponent],
  templateUrl: './ajouter-compte-rendu.component.html',
  styleUrl: './ajouter-compte-rendu.component.css'
})
export class AjouterCompteRenduComponent {
  examensRadiologiquesService = inject(ExamensRadiologiquesService)
  radiologyImagesService = inject(RadiologyImagesService)

  faPlusCircle=faPlusCircle
  faTrashCan=faTrashCan 
  faPenToSquare=faPenToSquare

  closeEvent= output()
  next = signal(false)
  examen = input.required<ExamenRadiologique>()
  imageAdded = signal(false)
  formGroup !: FormGroup

  deleteImgDialog = signal(false)
  modifyImgDialog = signal(false)
  addForm = signal(false)

  imgId = signal(-1)
  deleteImgEndpoint = computed(()=>`
    http://localhost:8000/examens/radiology-images/${this.imgId()}/`
   )

  imageData = signal<RadiologyImage | undefined>(undefined)


  constructor(public userIndicatorService: UserIndicatorsServiceService){}
  ngOnInit(){
    this.formGroup = new FormGroup({
      compte_rendu: new FormControl('',[Validators.required]),
      examen_radiologique: new FormControl(this.examen().id, [Validators.required]),
      dossier_patient: new FormControl( this.examen().dossier_patient, [Validators.required]),
      date: new FormControl(this.examen().date, [Validators.required]),
      radiologue: new FormControl(localStorage.getItem('technicianID'),[Validators.required]),
    })
    this.radiologyImagesService.radiologyImages.set([])
  }
  closeAdd(): void{
    this.closeEvent.emit()
  }

  nextStep(event: Event){
    event.stopPropagation();
    this.next.set(true)
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

  setImageAdded(added: boolean):void {
    this.imageAdded.set(added)
  }

  async onSubmit(event: Event){
    if(this.formGroup.valid){
      console.log(this.formGroup.value)

      try {
        this.userIndicatorService.loadingData.set({
          isLoading: true,
          loadingMessage: 'Ajout du compte rendu en cours...'
        })

        const res = await axios.put('http://localhost:8000/examens/examen_radiologique/'+this.examen().id+'/',this.formGroup.value,{
          headers:{
            Authorization: 'Bearer '+localStorage.getItem('accessToken')
          }
        })
        console.log(res.data)
        if(res.status === 200){ 
          this.userIndicatorService.sucessData.set({
            isSuccess: true,
            successMessage: 'Compte rendu ajouté avec succès'
          }) 

          const updatedData = res.data

          this.examensRadiologiquesService.examensRadiologiques.set(
            this.examensRadiologiquesService.examensRadiologiques().map(e =>
              e.id === this.examen().id ? { ...e, ...updatedData } : e
            )
          )
          
        }
        else this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de l\'ajout du compte rendu'
        })
        
      }
      catch (error) {
        console.log(error)
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de l\'ajout du compte rendu'
        })
      }
      finally{
        this.userIndicatorService.loadingData.set({
          isLoading: false,
          loadingMessage: 'Chargement... '
        })
        this.nextStep(event)
      }
    }
  }
}
