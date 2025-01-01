import { Component, input, signal } from '@angular/core';
import { ExamenPlusComponent } from "../examen-plus/examen-plus.component";
import { ExamenRadiologique } from '../../../models/Examen';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ExamenPlusComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  plusOpened = signal(false)
  examen = input.required<ExamenRadiologique>()

  openPlus(): void{
    this.plusOpened.set(true)
  }

  closePlus(): void{
    this.plusOpened.set(false)
  }

}
