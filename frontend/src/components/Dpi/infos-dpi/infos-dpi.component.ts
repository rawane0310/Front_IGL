import { Component, OnInit } from '@angular/core';
import { MenuDpiComponent } from '../menu-dpi/menu-dpi.component';
import { InfoPatientService } from '../../services/info-patient.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Patient } from '../../services/info-patient.service';
@Component({
  selector: 'app-infos-dpi',
  standalone: true,
  imports: [MenuDpiComponent, HttpClientModule],
  templateUrl: './infos-dpi.component.html',
  styleUrl: './infos-dpi.component.css'
})
export class InfosDpiComponent implements OnInit  {
  patient: Patient | null = null; // Holds the fetched patient data

  constructor(private patientService: InfoPatientService) {}

  ngOnInit(): void {
    const patientId = '1'; 
    this.patientService.getPatient(patientId).subscribe({
      next: (data) => {
        this.patient = data; // Bind the fetched data to the template
        console.log('Before binding to template:', data);
      },
      error: (err) => {
        console.error('Error fetching patient data', err);
      },
    });
  }
}
