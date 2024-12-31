import { Component, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-examen-plus',
  standalone: true,
  imports: [FontAwesomeModule, DeleteDialogComponent],
  templateUrl: './examen-plus.component.html',
  styleUrl: './examen-plus.component.css'
})

export class ExamenPlusComponent {
  faTrashCan=faTrashCan
  faPenToSquare=faPenToSquare

  closeEvent = output()
  active = signal(0)
  deleteDialog = signal(false)

  closeExamen(): void{
    this.closeEvent.emit();
  }

  setActive(event: Event,tabIndex: number): void {
    event.stopPropagation();
    this.active.set(tabIndex)
  }

  opendeleteDialog(event: Event): void {
    event.stopPropagation();
    this.deleteDialog.set(true)
  }

  /**
   * Closes the delete dialog and sets the deleteDialog signal to false.
   *
   * @returns Nothing. This function is a void function.
   */
  closeDeleteDialog(): void {
    this.deleteDialog.set(false);
  }


  
}
