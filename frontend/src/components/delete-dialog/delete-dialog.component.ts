import { Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'; 
import { UserIndicatorsServiceService } from '../../services/user-indicators-service.service';
import axios from 'axios';

/**
 * Component responsible for managing the delete confirmation dialog.
 * It displays a dialog asking the user to confirm deletion of an item and handles the deletion logic.
 * 
 * The component emits the item's ID when the dialog is closed, either to trigger further actions 
 * or cancel the deletion if it wasn't confirmed.
 */
@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})

export class DeleteDialogComponent {

  /**
   * Icon used for the trash can button.
   * This is an imported icon from FontAwesome.
   */
  faTrashCan=faTrashCan

  /**
   * Event emitter used to send the item ID when the dialog is closed.
   * It emits either the ID of the deleted item or -1 if the action is canceled.
   */
  closeDialogEvent = output<number>()

  /**
   * The endpoint URL for the DELETE request to remove the item.
   * This is provided as an input to the component and should be a string URL.
   */
  endpoint = input.required<string>()


  /**
   * The ID of the item to be deleted.
   * This is required and must be passed to the component as input.
   */
  itemId = input.required<number>()


  /**
   * A flag indicating whether the item has been successfully deleted.
   * It is initially set to false and becomes true once the deletion is successful.
   */
  deleted : boolean = false


  
  /**
   * Constructor of the component.
   * It injects the UserIndicatorsServiceService to manage the loading, success and error indicators.
   * 
   * @param userIndicatorService - The service used to manage the loading and error indicators.
   */
  constructor(public userIndicatorService: UserIndicatorsServiceService){}


  /**
   * Closes the delete dialog and emits the item ID.
   * If the item was not deleted, the emitted ID is -1 to indicate cancellation.
   * 
   * @param id - The ID of the item to be deleted. If canceled, -1 is emitted.
   */
  closeDialog(id: number){
    // If the item has not been deleted, cancel the action by emitting -1
    if (! this.deleted) id = -1
    this.closeDialogEvent.emit(id)
  }


  /**
   * Sends a DELETE request to the specified endpoint to delete the item.
   * If the deletion is successful, the success message is displayed.
   * If an error occurs, an error message is shown.
   * 
   * After the deletion process, the dialog is closed, and the loading indicator is reset.
   * 
   * @returns A promise that resolves once the deletion process is completed.
   */
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
