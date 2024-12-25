import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { MenuDpiComponent } from "../menu-dpi/menu-dpi.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dpi-page',
  standalone: true,
  imports: [HeaderComponent, MenuDpiComponent,RouterModule],
  templateUrl: './dpi-page.component.html',
  styleUrl: './dpi-page.component.css'
})
export class DpiPageComponent {
  dpiId!: string;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.dpiId = this.route.snapshot.paramMap.get('dpiId')!;
    console.log("dpi page",this.dpiId,this.route); 
  }

}
