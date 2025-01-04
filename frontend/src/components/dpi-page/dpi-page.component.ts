import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { MenuDpiComponent } from "../menu-dpi/menu-dpi.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

/**
 * Component responsible for the DPI page view.
 * It handles displaying the header, DPI menu, and routing of content based on the `dpiId` parameter.
 */
@Component({
  selector: 'app-dpi-page',
  standalone: true,
  imports: [HeaderComponent, MenuDpiComponent,RouterModule],
  templateUrl: './dpi-page.component.html',
  styleUrl: './dpi-page.component.css'
})
export class DpiPageComponent {

  /**
   * Holds the DPI ID extracted from the route parameters.
   */
  dpiId!: string;


  /**
   * Constructor for the DpiPageComponent.
   * Injects `ActivatedRoute` to access route parameters and related information.
   * 
   * @param route - The ActivatedRoute used to retrieve route parameters.
   */
  constructor(private route: ActivatedRoute) {}


  /**
   * Lifecycle hook called when the component is initialized.
   * Extracts the `dpiId` parameter from the route and logs it to the console.
   */
  ngOnInit(): void {
    // Extracts the `dpiId` parameter from the URL
    this.dpiId = this.route.snapshot.paramMap.get('dpiId')!;
  }

}
