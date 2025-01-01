import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { RadiologyImagesService } from '../../../services/radiology-images.service';
import { RadiologyImage } from '../../../models/Examen';
@Component({
  selector: 'app-ajouter-radiology-image',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './ajouter-radiology-image.component.html',
  styleUrl: './ajouter-radiology-image.component.css'
})
export class AjouterRadiologyImageComponent {
  radioloyImagesService = inject(RadiologyImagesService)
  faCloudUpload = faCloudUpload
  examenId = input.required()
  imageData = input<RadiologyImage>()
  closeEvent = output()
  imageAddedEvent = output<boolean>()
  imagePreview : string | ArrayBuffer | null = null
  formGroup !: FormGroup

  closeAdd(): void{
    this.closeEvent.emit()
  }

  constructor(public userIndicatorService: UserIndicatorsServiceService){}
  ngOnInit(): void {
    this.formGroup= new FormGroup({
      titre: new FormControl(this.imageData()?.titre||'',[Validators.required]),
      image: new FormControl(this.imageData()?.image ||null,[Validators.required]),
      radiologue: new FormControl(localStorage.getItem('technicianID'),[Validators.required]),
      examen_radiologique: new FormControl(this.examenId(),[Validators.required]),
    })
    this.imagePreview = this.imageData()?.image || null
  }

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

}
