import { Component, inject, input, signal } from '@angular/core';
import { AnalysePlusComponent } from '../analyse-plus/analyse-plus.component';
import { AnalyseBiologique } from '../../../models/Examen';
import { AnalysesBiologiquesService } from '../../../services/analyses-biologiques.service';
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';

@Component({
  selector: 'app-card:not(p)',
  standalone: true,
  imports: [AnalysePlusComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  analysesBiologiquesService = inject(AnalysesBiologiquesService)

  plusOpened = signal(false)

  analyse = input.required<AnalyseBiologique>()

  constructor(public userIndicatorsService: UserIndicatorsServiceService){}
  openPlus(): void{
    this.plusOpened.set(true)
  }

  closePlus(): void{
    this.plusOpened.set(false)
  }


}
