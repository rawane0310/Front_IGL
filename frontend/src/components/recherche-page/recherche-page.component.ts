import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarcodeFormat } from '@zxing/library';
import { PatientService } from '../../services/patient_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-page',
  standalone: true,
  imports: [HeaderComponent, ZXingScannerModule, NgIf, CommonModule, FormsModule],
  templateUrl: './recherche-page.component.html',
  styleUrl: './recherche-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class RecherchePageComponent {
  showScanner: boolean = false;
  scannerEnabled: boolean = false;

  nss: string = ''; 
  patientData: any; 
  message: string = '';
  messageType: string = '';

  constructor(private patientService: PatientService, private router: Router) { }


  /**
   * Search for a patient using NSS.
   */
  searchByNSS() {
    this.patientData = null;

    if (!this.nss.trim()) {
      this.showMessage('Veuillez saisir le NSS, svp!', 'error');
      return; 
    }

    this.patientService.searchPatientByNSS(this.nss).subscribe({
      next: (data) => {
        this.showMessage('Patient trouvé!', 'success');
        this.patientData = data;
       setTimeout(() => {
        this.router.navigate(['/dpi/', data.id]);
       }, 3000);
        console.log(data);
      },
      error: (err) => {
        this.showMessage(err.error?.detail || 'Une erreur est produite lors dela recherche', 'error');
      },
    });
  }

  /**
   * Toggle the QR scanner on/off.
   */

  toggleQRScanner() {
    this.showScanner = !this.showScanner;
    this.scannerEnabled = this.showScanner;
  }

  /**
    * Handle successful QR code scan.
    * @param result The QR code scan result containing id and name.
    */
  onQRCodeScanned(result: string) {
    this.scannerEnabled = false;

    try {
      // console.log('QR code scanned:', result);
      const qrData = JSON.parse(result);
      const id = qrData.id;
      const name = qrData.nom;

      this.patientData = null;

      this.patientService.searchPatientByQRCode(id, name).subscribe({
        next: (data) => {
          this.showMessage('Patient trouvé!', 'success');
          this.patientData = data;
          setTimeout(() => {
            this.router.navigate(['/dpi/', data.id]);
     
           }, 3000);
          console.log(data);
        },
        error: (err) => {
          this.showMessage(err.error?.detail || 'Une erreur est produite lors de scan du code QR!', 'error');
        },
      });
    } catch (e) {
      console.error('Error parsing QR code:', e);
      this.showMessage("QR code invalide. Ressayez svp!.", 'error');
    }
  }


  formats = [BarcodeFormat.QR_CODE];

  // Method to show success or error messages
  showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000); // Clear the message after 3 seconds
  }

}