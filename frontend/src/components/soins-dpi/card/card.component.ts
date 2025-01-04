import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';
import { SoinsPlusComponent } from "../soins-plus/soins-plus.component";
import SoinInfermier from '../../../models/SoinInfermier';


/**
 * Represents a card component displaying information about a medical care (soin).
 * It allows for toggling the display of additional information related to the care.
 * 
 * @component
 * 
 * @property {boolean} opened - A flag indicating whether the card is opened (true) or closed (false).
 * @property {SoinInfermier} soin - The medical care object to be displayed in the card. This is required.
 * 
 * @method openSoin - Opens the card and logs the medical care object to the console.
 * @method closeSoin - Closes the card.
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, SoinsPlusComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  /** 
   * A flag to determine if the card is opened (true) or closed (false). 
   * Initially, the card is closed.
   * @type {boolean}
   */
  opened: boolean = false;

  /**
   * The medical care object (SoinInfermier) associated with this card.
   * This property is required for the component to function properly.
   * @type {SoinInfermier}
   */
  soin = input.required<SoinInfermier>()

  /**
   * Opens the card, revealing the details of the medical care.
   * Logs the medical care object to the console for debugging purposes.
   * 
   * @example
   * // Example usage: 
   * this.openSoin(); // Opens the card and logs the soin object.
   */  
  openSoin(){
    this.opened = true;
    console.log(this.soin());
  }

  /**
   * Closes the card, hiding the medical care details.
   * 
   * @example
   * // Example usage: 
   * this.closeSoin(); // Closes the card.
   */
  closeSoin(){
    this.opened = false;
  }
}
