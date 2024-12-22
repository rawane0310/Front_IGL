import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarcodeFormat } from '@zxing/library';
import { PatientService } from '../../services/patient_service';

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

  nss: string = ''; // Variable pour stocker le NSS saisi
  patientData: any; // Variable pour stocker les données du patient
  errorMessage: string | null = null; // Variable pour les erreurs

  constructor(private patientService: PatientService) { }


  searchByNSS() {
    if (!this.nss) {
      this.errorMessage = 'Veuillez entrer un NSS valide.';
      return;
    }

  }





  //I WILL HANDLE THIS WHEN THE BDD IS DONE
  // searchByNSS() {
  //   if (!this.nssInput.trim()) return;

  // this.http.get(`/api/patients/search?nss=${this.nssInput}`).subscribe(
  //   (data) => {
  //     console.log('Patient trouvé : ', data);
  //     // Rediriger ou afficher les informations du patient
  //   },
  //   (error) => {
  //     console.error('Erreur lors de la recherche du NSS', error);
  //   }
  // );
  //}




  toggleQRScanner() {
    this.showScanner = !this.showScanner;
    this.scannerEnabled = this.showScanner;
  }

  //I WILL USE THIS WHEN THE BDD IS READY 


  // Cette fonction sera appelée lorsque le QR code est scanné

  // onQRCodeScanned(result: string) {
  //   console.log('QR Code scanné : ', result);
  //   this.scannerEnabled = false;
  //   this.showScanner = false;

  //   // Supposons que le QR code contienne un JSON avec l'ID et le nom du patient
  //   const qrData = JSON.parse(result);
  //   const { id, name } = qrData;

  //   // Envoie du JSON contenant l'ID et le nom du patient au backend
  //   this.http.post('/api/search-patient', { id, name }).subscribe(
  //     (response: any) => {
  //       console.log('Réponse du backend : ', response);

  //       // Si la recherche réussit, tu peux rediriger vers la page du patient
  //       window.location.href = `/dossier-patient/${response.patientId}`;  // Redirection vers la page du DPI
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la recherche du patient', error);
  //     }
  //   );
  // }


  //I'M USING THIS TEMPORARY SOLUTION JUST FOR TESTING THE SCAN I WILL DELETE IT WHEN THE BACKEND IS READY


  scannedResult: any;
  formats = [BarcodeFormat.QR_CODE];

  onCodeResult(result: string): void {
    try {
      this.scannedResult = JSON.parse(result);
      this.scannerEnabled = false
      console.log('QR Code Scanné:', this.scannedResult);
    } catch (error) {
      console.error('Invalid QR Code data:', result);
    }
  }

}