import { Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'; 
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';
import axios from 'axios';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})

export class DeleteDialogComponent {
  faTrashCan=faTrashCan
  closeDialogEvent = output<number>()

  constructor(public userIndicatorService: UserIndicatorsServiceService){}

  endpoint = input.required<string>()
  itemId = input.required<number>()
  deleted : boolean = false
  closeDialog(id: number){
    if (! this.deleted) id = -1
    this.closeDialogEvent.emit(id)
  }

  async deleteItem():Promise<void>{
    try {
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading:true, 
      })

      const res = await axios.delete(this.endpoint(),{
        headers:{
          'Authorization': 'Bearer '+ localStorage.getItem('accessToken')
        }
      })

      console.log(res.data)
      if(res.status === 204){
        this.userIndicatorService.sucessData.set({
          isSuccess: true,
          successMessage:"L'élement est supprimé avec success! "
        })
        this.deleted = true
      }
      else{
        this.userIndicatorService.errorData.set({
          isError: true,
          errorMessage:"Une erreur est servnue lors de la suppression de l'élement"
        })
      }

    } 
    catch (error) {
      console.log(error)
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage:"Une erreur est servnue lors de la suppression de l'élement"
      })
    }
    finally{
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading:false, 
      })
      this.closeDialog(this.itemId())
    }
  }
}
