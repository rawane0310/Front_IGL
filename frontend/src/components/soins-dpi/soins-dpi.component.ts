import { Component, signal } from '@angular/core';
import { MenuDpiComponent } from '../menu-dpi/menu-dpi.component';
import { CardComponent } from "./card/card.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { AddSoinFormComponent } from "../add-soin-form/add-soin-form.component";

@Component({
  selector: 'app-soins-dpi',
  standalone: true,
  imports: [CardComponent, FontAwesomeModule, AddSoinFormComponent],
  templateUrl: './soins-dpi.component.html',
  styleUrl: './soins-dpi.component.css'
})
export class SoinsDpiComponent {
  faCirclePlus = faCirclePlus;
  addFormOpened = signal(false)

  openAddForm(event: Event) {
    event.stopPropagation()
    this.addFormOpened.set(true);
  }
  closeAddForm() {
    this.addFormOpened.set(false);
  }
}
