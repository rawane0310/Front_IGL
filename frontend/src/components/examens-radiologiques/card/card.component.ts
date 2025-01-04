import { Component, input, signal } from '@angular/core';
import { ExamenPlusComponent } from "../examen-plus/examen-plus.component";
import { ExamenRadiologique } from '../../../models/Examen';


/**
 * A card component to display information about a radiological exam.
 * It provides functionality to open and close a detailed view of the exam (using `ExamenPlusComponent`).
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ExamenPlusComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  /**
   * Reactive signal to track whether the detailed view (`ExamenPlusComponent`) is open.
   * Defaults to `false` (closed state).
   */
  plusOpened = signal(false)


  /**
   * Input property for the radiological exam data to be displayed in the card.
   * This is a required input and must conform to the `ExamenRadiologique` model.
   */
  examen = input.required<ExamenRadiologique>()


  /**
   * Opens the detailed view of the radiological exam.
   * Sets the `plusOpened` signal to `true`.
   */
  openPlus(): void{
    this.plusOpened.set(true)
  }


  /**
   * Closes the detailed view of the radiological exam.
   * Sets the `plusOpened` signal to `false`.
   */
  closePlus(): void{
    this.plusOpened.set(false)
  }

}
