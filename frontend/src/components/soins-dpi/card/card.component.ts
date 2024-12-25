import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SoinsPlusComponent } from "../soins-plus/soins-plus.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, SoinsPlusComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  opened: boolean = false;
  openSoin(){
    this.opened = true;
  }
  closeSoin(){
    this.opened = false;
  }
}
