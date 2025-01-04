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

/**
 * The component responsible for adding a report for a radiological exam.
 * It includes a form for creating the report, managing associated radiology images,
 * and providing UI for modifying or deleting images.
 */
@Component({
  selector: 'app-ajouter-compte-rendu',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, DeleteDialogComponent, AjouterRadiologyImageComponent],
  templateUrl: './ajouter-compte-rendu.component.html',
  styleUrl: './ajouter-compte-rendu.component.css'
})
export class AjouterCompteRenduComponent {

  /**
   * Injected service to manage radiological exam data.
   */
  examensRadiologiquesService = inject(ExamensRadiologiquesService)


  /**
   * Injected service to manage radiology images data.
   */
  radiologyImagesService = inject(RadiologyImagesService)


  /**
   * FontAwesome icon for adding a new item.
   */
  faPlusCircle=faPlusCircle


  /**
   * FontAwesome icon for deleting an item.
   */
  faTrashCan=faTrashCan 


  /**
   * FontAwesome icon for editing an item.
   */
  faPenToSquare=faPenToSquare


  /**
   * Event emitter to close the current form or dialog.
   */
  closeEvent= output()


  /**
   * Signal that tracks the next step state in the form.
   */
  next = signal(false)

  /**
   * Input value representing the selected radiological exam.
   */
  examen = input.required<ExamenRadiologique>()


  /**
   * Signal to track whether a radiology image has been added.
   */
  imageAdded = signal(false)


  /**
   * Reactive form group to handle the form controls for the account report.
   */
  formGroup !: FormGroup

  /**
   * Signal to handle the visibility of the delete image dialog.
   */
  deleteImgDialog = signal(false)

  /**
   * Signal to handle the visibility of the modify image dialog.
   */
  modifyImgDialog = signal(false)


  /**
   * Signal to handle the visibility of the add image form.
   */
  addForm = signal(false)

  /**
   * Signal to store the ID of the image to be deleted.
   */
  imgId = signal(-1)


  /**
   * Computed property to generate the endpoint URL for deleting an image.
   */
  deleteImgEndpoint = computed(()=>`
    http://localhost:8000/examens/radiology-images/${this.imgId()}/`
   )


  /**
   * Signal to store the image data for modifying or viewing details.
   */
  imageData = signal<RadiologyImage | undefined>(undefined)



  /**
   * Constructor to inject the user indicator service for loading and success/error messages.
   * @param userIndicatorService The service responsible for managing user feedback indicators.
   */
  constructor(public userIndicatorService: UserIndicatorsServiceService){}

  /**
   * ngOnInit lifecycle hook to initialize the form controls and reset image data.
   * This method sets up the form group with the initial form values.
   */
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


  /**
   * Close the current add form or dialog.
   */
  closeAdd(): void{
    this.closeEvent.emit()
  }


  
  /**
   * Proceed to the next step in the form flow.
   * @param event The DOM event triggering this action.
   */
  nextStep(event: Event){
    event.stopPropagation();
    this.next.set(true)
  }
  

  /**
   * Open the delete image dialog for the specified image ID.
   * @param event The DOM event triggering this action.
   * @param id The ID of the image to delete.
   */
  openDeleteImgDialog(event:Event, id:number):void {
    event.stopPropagation()
    this.imgId.set(id)
    this.deleteImgDialog.set(true)
  }


  /**
   * Close the delete image dialog and remove the image from the list.
   * @param id The ID of the image to delete.
   */
  closeDeleteImgDialog(id: number):void {
    this.radiologyImagesService.radiologyImages.set(
      this.radiologyImagesService.radiologyImages().filter(ri=>ri.id!==id)
    )
    this.deleteImgDialog.set(false)
  }


  /**
   * Open the modify image dialog for the selected image.
   * @param event The DOM event triggering this action.
   * @param image The image data to modify.
   */
  openModifyImgDialog(event:Event, image: RadiologyImage):void {
    event.stopPropagation()
    this.imageData.set(image)
    this.modifyImgDialog.set(true)
  }


  /**
   * Close the modify image dialog.
   */
  closeModifyImgDialog():void {
    this.modifyImgDialog.set(false)
  }



  /**
   * Open the add image form.
   * @param event The DOM event triggering this action.
   */
  openAddForm(event:Event):void {
    event.stopPropagation()
    this.addForm.set(true)
  }


  /**
   * Close the add image form.
   */
  closeAddForm():void {
    this.addForm.set(false)
  }


  /**
   * Set the state indicating whether an image has been added.
   * @param added Boolean value representing the image addition state.
   */
  setImageAdded(added: boolean):void {
    this.imageAdded.set(added)
  }


  /**
   * Submit the form data and update the radiological exam with the account report.
   * This method sends a PUT request to the backend to update the exam with the new report.
   * @param event The DOM event triggering this action.
   */
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
