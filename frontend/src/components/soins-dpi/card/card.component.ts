import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';
import { SoinsPlusComponent } from "../soins-plus/soins-plus.component";
import SoinInfermier from '../../../models/SoinInfermier';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, SoinsPlusComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  opened: boolean = false;

  soin = input.required<SoinInfermier>()
  openSoin(){
    this.opened = true;
    console.log(this.soin());
  }
  closeSoin(){
    this.opened = false;
  }
}
