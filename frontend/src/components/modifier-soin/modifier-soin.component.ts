import { Component, output } from '@angular/core';

@Component({
  selector: 'app-modifier-soin',
  standalone: true,
  imports: [],
  templateUrl: './modifier-soin.component.html',
  styleUrl: './modifier-soin.component.css'
})
export class ModifierSoinComponent {
  modifierSoinCloseEvent = output()

  closeSoin(){
    this.modifierSoinCloseEvent.emit()
  }
}
