import { Component, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  faTrashCan=faTrashCan
  closeDialogEvent = output()

  closeDialog(){
    this.closeDialogEvent.emit()
  }
}
