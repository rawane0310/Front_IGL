import { Component } from '@angular/core';
import { CardComponent } from "./card/card.component";

@Component({
  selector: 'app-examens-radiologiques',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './examens-radiologiques.component.html',
  styleUrl: './examens-radiologiques.component.css'
})
export class ExamensRadiologiquesComponent {

}
