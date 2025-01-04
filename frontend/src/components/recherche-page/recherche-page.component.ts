import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarcodeFormat } from '@zxing/library';
import { PatientService } from '../../services/patient_service';
import { Router } from '@angular/router';

/**
 * Composant représentant la page de recherche des patients.
 * Permet la recherche de patients par NSS (Numéro de Sécurité Sociale) ou via un code QR.
 */
@Component({
  selector: 'app-recherche-page',
  standalone: true,
  imports: [HeaderComponent, ZXingScannerModule, NgIf, CommonModule, FormsModule],
  templateUrl: './recherche-page.component.html',
  styleUrl: './recherche-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecherchePageComponent {
  /**
   * Indique si le scanner de code QR est affiché.
   * @type {boolean}
   */
  showScanner: boolean = false;

  /**
   * Indique si le scanner de code QR est activé.
   * @type {boolean}
   */
  scannerEnabled: boolean = false;

  /**
   * NSS (Numéro de Sécurité Sociale) saisi par l'utilisateur.
   * @type {string}
   */
  nss: string = '';

  /**
   * Données du patient récupérées suite à la recherche.
   * @type {any}
   */
  patientData: any;

  /**
   * Message à afficher à l'utilisateur.
   * @type {string}
   */
  message: string = '';

  /**
   * Type du message (success ou error).
   * @type {string}
   */
  messageType: string = '';

  /**
   * Formats pris en charge pour le scanner (ex. QR Code).
   * @type {BarcodeFormat[]}
   */
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  /**
   * Constructeur du composant.
   * @param {PatientService} patientService - Service pour la gestion des patients.
   * @param {Router} router - Service pour la navigation.
   */
  constructor(private patientService: PatientService, private router: Router) { }

  /**
   * Recherche un patient par NSS.
   * Affiche un message d'erreur si le NSS est vide ou inexistant.
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
      },
      error: (err) => {
        this.showMessage(err.error?.detail || 'Une erreur est produite lors de la recherche', 'error');
      },
    });
  }

  /**
   * Bascule l'affichage du scanner de code QR.
   */
  toggleQRScanner() {
    this.showScanner = !this.showScanner;
    this.scannerEnabled = this.showScanner;
  }

  /**
   * Gère le résultat d'un code QR scanné.
   * Tente de rechercher un patient à partir des informations contenues dans le code QR.
   * @param {string} result - Résultat du scan du code QR.
   */
  onQRCodeScanned(result: string) {
    this.scannerEnabled = false;

    try {
      const qrData = JSON.parse(result);
      const id = qrData.ID;
      const name = qrData.Patient;

      this.patientData = null;

      this.patientService.searchPatientByQRCode(id, name).subscribe({
        next: (data) => {
          this.showMessage('Patient trouvé!', 'success');
          this.patientData = data;
          setTimeout(() => {
            this.router.navigate(['/dpi/', data.id]);
          }, 3000);
        },
        error: (err) => {
          this.showMessage(err.error?.error || 'Une erreur est produite lors du scan du code QR!', 'error');
        },
      });
    } catch (e) {
      this.showMessage('QR code invalide. Ressayez svp!', 'error');
    }
  }

  /**
   * Affiche un message temporaire (success ou error) à l'utilisateur.
   * @param {string} message - Message à afficher.
   * @param {'success' | 'error'} type - Type du message.
   */
  showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000); // Efface le message après 3 secondes.
  }
}