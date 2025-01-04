import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { RadiologyImagesService } from '../../../services/radiology-images.service';
import { RadiologyImage } from '../../../models/Examen';

/**
 * Component for adding or modifying a radiology image associated with a radiological exam.
 * It provides a form to upload or edit an image and supports image previews.
 */
@Component({
  selector: 'app-ajouter-radiology-image',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './ajouter-radiology-image.component.html',
  styleUrl: './ajouter-radiology-image.component.css'
})
export class AjouterRadiologyImageComponent {

  /**
   * Injected service to manage the radiology images data.
   */
  radioloyImagesService = inject(RadiologyImagesService)

  /**
   * FontAwesome icon for file upload.
   */
  faCloudUpload = faCloudUpload

   /**
   * Input representing the ID of the radiological exam for which the image is associated.
   */
  examenId = input.required()

  /**
   * Input containing the data of the image to be modified (if any).
   */
  imageData = input<RadiologyImage>()

   /**
   * Output event emitter to notify when the form is closed.
   */
  closeEvent = output()


  /**
   * Output event emitter to notify when an image has been successfully added.
   */
  imageAddedEvent = output<boolean>()


  /**
   * Preview of the uploaded image.
   */
  imagePreview : string | ArrayBuffer | null = null


  /**
   * Reactive form group to handle the form controls for adding or modifying a radiology image.
   */
  formGroup !: FormGroup

  /**
   * Constructor for the component. It injects the user indicators service to manage loading and success/error messages.
   * @param userIndicatorService The service responsible for managing loading, success, and error indicators.
   */
  constructor(public userIndicatorService: UserIndicatorsServiceService){}


  /**
   * ngOnInit lifecycle hook to initialize the form controls with the current image data (if available).
   * It also sets up the image preview if an image exists.
   */
  ngOnInit(): void {
    this.formGroup= new FormGroup({
      titre: new FormControl(this.imageData()?.titre||'',[Validators.required]),
      image: new FormControl(this.imageData()?.image ||null,[Validators.required]),
      radiologue: new FormControl(localStorage.getItem('technicianID'),[Validators.required]),
      examen_radiologique: new FormControl(this.examenId(),[Validators.required]),
    })
    this.imagePreview = this.imageData()?.image || null
  }

  /**
   * Handles the file input change event. It reads the selected file and updates the form with the image file,
   * as well as sets the image preview.
   * @param event The change event triggered by the file input.
   */
  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.length) {
      const file = fileInput.files[0];
      this.formGroup.patchValue({ image: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }



  /**
   * Adds a new radiology image by sending a POST request to the backend.
   * It uses FormData to send the image and associated data.
   */
  async addImage(): Promise<void> {
    const formData = new FormData();
      formData.append('titre', this.formGroup.value.titre);
      formData.append('image', this.formGroup.value.image);
      formData.append('radiologue', this.formGroup.value.radiologue);
      formData.append('examen_radiologique', this.formGroup.value.examen_radiologique);

      try {
        this.userIndicatorService.loadingData.set({
          isLoading: true,
          loadingMessage: 'Ajout en cours...'
        })

        const res = await axios.post('http://localhost:8000/examens/radiology-images/',formData,{
          headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer '+localStorage.getItem('accessToken')
          }
        })

        console.log(res.data)
        if(res.status === 201){ 
          this.userIndicatorService.sucessData.set({
            isSuccess: true,
            successMessage: 'Image médicale ajouté avec succès'
          }) 

          const updatedData = this.radioloyImagesService.radiologyImages()
          updatedData.push(res.data)
          this.radioloyImagesService.radiologyImages.set(updatedData)
          this.imageAddedEvent.emit(true)
        }
        else this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de l\'ajout de l\'image médicale'
        })
        
      }
      catch (error) {
        console.log(error)
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de l\'ajout de l\'image médicale'
        })
        this.imageAddedEvent.emit(false)
      }
      finally{
        this.userIndicatorService.loadingData.set({
          isLoading: false,
          loadingMessage: 'Chargement... '
        })
        this.closeAdd()
      }

  }


   /**
   * Modifies an existing radiology image by sending a PUT request to the backend.
   * The image data is updated, and the list of images is refreshed after the update.
   */
  async modifyImage(): Promise<void> {
    const formData = new FormData();
      formData.append('titre', this.formGroup.value.titre);
      formData.append('image', this.formGroup.value.image);
      formData.append('radiologue', this.formGroup.value.radiologue);
      formData.append('examen_radiologique', this.formGroup.value.examen_radiologique);

      try {
        this.userIndicatorService.loadingData.set({
          isLoading: true,
          loadingMessage: 'Modification en cours...'
        })

        const res = await axios.put('http://localhost:8000/examens/radiology-images/'+this.imageData()?.id+'/',formData,{
          headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer '+localStorage.getItem('accessToken')
          }
        })

        console.log(res.data)
        if(res.status === 200){ 
          this.userIndicatorService.sucessData.set({
            isSuccess: true,
            successMessage: 'Image médicale modifié avec succès'
          }) 

          const updatedData = this.radioloyImagesService.radiologyImages().filter(image => image.id !== this.imageData()?.id)
          updatedData.push(res.data)
          this.radioloyImagesService.radiologyImages.set(
            updatedData
          )
          
        }
        else this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la modification de l\'image médicale'
        })
        
      }
      catch (error) {
        console.log(error)
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage: 'Erreur lors de la modification de l\'image médicale'
        })
      }
      finally{
        this.userIndicatorService.loadingData.set({
          isLoading: false,
          loadingMessage: 'Chargement... '
        })
        this.closeAdd()
      }

  }

  /**
   * Submits the form data, either modifying an existing image or adding a new one,
   * based on whether `imageData` exists.
   */
  async onSubmit(): Promise<void>{
    console.log(this.formGroup.value);
    if(this.formGroup.valid){
      if(this.imageData()){
        await this.modifyImage()
      }
      else{
        await this.addImage()
      }
    }
  }


  /**
   * Closes the current form or dialog by emitting the close event.
   */
  closeAdd(): void{
    this.closeEvent.emit()
  }


}
