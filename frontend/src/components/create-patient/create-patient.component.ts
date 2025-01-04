import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { PatientService } from '../../services/patient_service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

/**
 * Type représentant les clés du formulaire de création de patient.
 */
type PatientFormKeys =
  | 'nss'
  | 'nom'
  | 'prenom'
  | 'date_naissance'
  | 'adresse'
  | 'tel'
  | 'mutuelle'
  | 'medecin_traitant'
  | 'personne_a_contacter'
  | 'email'
  | 'password';

/**
 * Composant Angular pour la création de dossiers patients.
 */
@Component({
  selector: 'app-create-patient',
  standalone: true,
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css'],
  imports: [HeaderComponent, FormsModule, NgFor]
})
export class CreatePatientComponent {

  /**
   * Objet contenant les données du formulaire de création de patient.
   */
  formData: Record<PatientFormKeys, string> = {
    nss: '',
    nom: '',
    prenom: '',
    date_naissance: '',
    adresse: '',
    tel: '',
    mutuelle: '',
    medecin_traitant: '',
    personne_a_contacter: '',
    email: '',
    password: ''
  };

  /**
   * Service pour gérer les opérations liées aux patients.
   * @param patientService Service injecté pour interagir avec les données des patients.
   */
  constructor(private patientService: PatientService) { }

  /**
   * Valide les données du formulaire de création de patient.
   * - Vérifie que tous les champs sont remplis.
   * - Valide le format de la date de naissance.
   * - Valide le format de l'adresse email.
   * 
   * @returns {boolean} `true` si le formulaire est valide, sinon `false`.
   */
  validateForm(): boolean {
    for (const key in this.formData) {
      if (!this.formData[key as PatientFormKeys].trim()) {
        Swal.fire({
          icon: 'warning',
          title: 'Erreur de validation',
          text: 'Tous les champs doivent être remplis.',
          confirmButtonColor: '#d33',
          width: '400px',
          iconColor: '#d33',
          customClass: { popup: 'small-swal-popup' },
        });
        return false;
      }
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(this.formData.date_naissance)) {
      Swal.fire({
        icon: 'warning',
        title: 'Erreur de validation',
        text: 'La date de naissance doit être au format YYYY-MM-DD.',
        confirmButtonColor: '#d33',
        iconColor: '#d33',
        width: '400px',
        customClass: { popup: 'small-swal-popup' },
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Erreur de validation',
        text: 'Veuillez entrer une adresse email valide.',
        confirmButtonColor: '#d33',
        iconColor: '#d33',
        width: '400px',
        customClass: { popup: 'small-swal-popup' },
      });
      return false;
    }

    return true;
  }

  /**
   * Soumet le formulaire de création de patient.
   * - Valide les données du formulaire.
   * - Envoie les données au service PatientService pour la création du dossier.
   * - Gère les réponses ou erreurs avec des notifications visuelles.
   */
  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.patientService.createDossierPatient(this.formData).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Dossier patient créé avec succès.',
          confirmButtonColor: '#28A7B8',
          iconColor: '#28A7B8',
          confirmButtonText: 'Ok',
          width: '400px',
          padding: '1rem',
          customClass: { popup: 'small-swal-popup' },
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.error.error || 'Une erreur est survenue. Veuillez vérifier les données saisies.',
          confirmButtonColor: '#d33',
          iconColor: '#d33',
          confirmButtonText: 'Réessayer',
          width: '400px',
          padding: '1rem',
          customClass: { popup: 'small-swal-popup' },
        });
      }
    });
  }
}
