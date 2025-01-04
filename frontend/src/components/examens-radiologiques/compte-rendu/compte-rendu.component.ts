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
import { UserRoleService } from '../../../services/user-role.service';

/**
 * Component for displaying and managing radiological exam reports and related images.
 */
@Component({
  selector: 'app-compte-rendu',
  standalone: true,
  imports: [FontAwesomeModule, ModifierCompteRenduComponent, DeleteDialogComponent, AjouterRadiologyImageComponent],
  templateUrl: './compte-rendu.component.html',
  styleUrl: './compte-rendu.component.css'
})
export class CompteRenduComponent {

  /**
   * Service for managing radiology images.
   */
  radiologyImagesService = inject(RadiologyImagesService)


  /**
   * FontAwesome icon for editing.
   */
  faPenToSquare = faPenToSquare;


  /**
    * FontAwesome icon for deleting.
    */
  faTrashCan = faTrashCan;
 
  
  /**
    * FontAwesome icon for adding.
    */
  faPlusCircle = faPlusCircle;

  /**
   * Input property representing the radiological exam details.
   * Must conform to the `ExamenRadiologique` model and is required.
   */
  examen = input.required<ExamenRadiologique>()


  /**
   * Signal to manage the visibility of the modify form.
   */
  modifyForm = signal(false)


  /**
   * Signal to manage the visibility of the delete confirmation dialog for images.
   */
  deleteImgDialog = signal(false)


  /**
   * Signal to manage the visibility of the modify image dialog.
   */
  modifyImgDialog = signal(false)


  /**
   * Signal to manage the visibility of the add image form.
   */
  addForm = signal(false)


  /**
   * Signal to store the ID of the image to be deleted.
   */
  imgId = signal(-1)


  /**
   * Computed property that generates the API endpoint for deleting an image.
   * The endpoint includes the ID of the image stored in `imgId`.
   */
  deleteImgEndpoint = computed(()=>`
    http://localhost:8000/examens/radiology-images/${this.imgId()}/`
   )


  /**
   * Signal to store the data of the image being modified.
   */
  imageData = signal<RadiologyImage | undefined>(undefined)


  /**
   * Constructor for injecting services used in the component.
   * @param userIndicatorService Service for managing user feedback indicators.
   * @param userRoleService Service for handling user role permissions.
   */
  constructor(
    public userIndicatorService: UserIndicatorsServiceService, 
    public userRoleService: UserRoleService
  ){}


  /**
   * Opens the modify report form and prevents event propagation.
   * @param event The DOM event to stop propagation.
   */
  openModifyForm(event: Event): void {
    event.stopPropagation()
    this.modifyForm.set(true)
  }


  /**
   * Closes the modify report form.
   */
  closeModifyForm():void {
    this.modifyForm.set(false)
  }


  /**
   * Opens the delete image confirmation dialog and sets the image ID.
   * Prevents event propagation.
   * @param event The DOM event to stop propagation.
   * @param id The ID of the image to be deleted.
   */
  openDeleteImgDialog(event:Event, id:number):void {
    event.stopPropagation()
    this.imgId.set(id)
    this.deleteImgDialog.set(true)
  }


  /**
   * Closes the delete image dialog and removes the image from the local list.
   * @param id The ID of the deleted image.
   */
  closeDeleteImgDialog(id: number):void {
    this.radiologyImagesService.radiologyImages.set(
      this.radiologyImagesService.radiologyImages().filter(ri=>ri.id!==id)
    )
    this.deleteImgDialog.set(false)
  }


  /**
   * Opens the modify image dialog with the provided image data.
   * Prevents event propagation.
   * @param event The DOM event to stop propagation.
   * @param image The image data to be modified.
   */
  openModifyImgDialog(event:Event, image: RadiologyImage):void {
    event.stopPropagation()
    this.imageData.set(image)
    this.modifyImgDialog.set(true)
  }


  /**
   * Closes the modify image dialog.
   */
  closeModifyImgDialog():void {
    this.modifyImgDialog.set(false)
  }


  /**
   * Opens the add image form and prevents event propagation.
   * @param event The DOM event to stop propagation.
   */
  openAddForm(event:Event):void {
    event.stopPropagation()
    this.addForm.set(true)
  }


  /**
   * Closes the add image form.
   */
  closeAddForm():void {
    this.addForm.set(false)
  }


  /**
   * Lifecycle hook that initializes the component.
   * Fetches radiology images for the current exam from the API.
   */
  async ngOnInit(): Promise<void>{
    try {
      // Show loading indicator
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: true
      })

      // Fetch images from API
      const response = await axios.get('http://localhost:8000/examens/radiology-images/?examen='+this.examen().id,{
        headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('accessToken'),
          }  
      });

      console.log(response.data);
      // Update images in service if the request is successful
      if (response.status === 200) this.radiologyImagesService.radiologyImages.set(response.data);
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des Images médicales'
      })

    }
    catch (error) {
      // Handle errors
      console.log(error);
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des Images médicales'
      })
    }
    finally{
      // Hide loading indicator
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: false
      })
    }
  }

}
