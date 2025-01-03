import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { PatientService } from '../../services/patient_service';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

/**
 * Type définissant les clés possibles pour les champs du formulaire d'un patient.
 * Chaque clé représente un champ spécifique dans le formulaire.
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
 * Composant Angular représentant le formulaire de création d'un patient.
 * Ce composant permet de capturer et de soumettre les informations relatives à un patient.
 * Il utilise une liste de champs définis avec des placeholders pour chaque entrée.
 */
@Component({
  selector: 'app-create-patient',
  standalone: true,
  templateUrl: './create-patient.component.html',  // URL du template HTML pour le formulaire
  styleUrls: ['./create-patient.component.css'],   // URL des styles CSS associés
  imports: [HeaderComponent, FormsModule, NgFor]   // Importation des composants et modules nécessaires
})
export class CreatePatientComponent {
  /**
   * Objet `formData` qui stocke les valeurs des champs du formulaire.
   * Chaque clé dans cet objet correspond à une clé définie dans `PatientFormKeys` et
   * les valeurs sont de type `string`, initialisées à une chaîne vide.
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


  constructor(private patientService: PatientService) { }


  validateForm(): boolean {
    // Check if all fields are filled
    for (const key in this.formData) {
      console.log('Key:', key);
      if (!this.formData[key as PatientFormKeys].trim()) {
        Swal.fire({
          icon: 'warning',
          title: 'Erreur de validation',
          text: 'Tous les champs doivent être remplis.',
          confirmButtonColor: '#d33',
          width: '400px',
          iconColor: '#d33',
          customClass: {
            popup: 'small-swal-popup'
          },

        });
        return false;
      }
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(this.formData.date_naissance)) {
      Swal.fire({
        icon: 'warning',
        title: 'Erreur de validation',
        text: 'La date de naissance doit être au format YYYY-MM-DD.',
        confirmButtonColor: '#d33',
        iconColor: '#d33',
        width: '400px',
        customClass: {
          popup: 'small-swal-popup',
        },
      });
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Erreur de validation',
        text: 'Veuillez entrer une adresse email valide.',
        confirmButtonColor: '#d33',
        iconColor: '#d33',
        width: '400px',
        customClass: {
          popup: 'small-swal-popup',
        },
      });
      return false;
    }

    return true;
  }


  onSubmit(): void {
    console.log('Form data:', this.formData);
    if (!this.validateForm()) {
      return;
    }
    this.patientService.createDossierPatient(this.formData).subscribe({
      next: (response) => {
        console.log('Dossier créé avec succès:', response);
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Dossier patient créé avec succès.',
          confirmButtonColor: '#28A7B8',
          iconColor: '#28A7B8',
          confirmButtonText: 'Ok',
          width: '400px',
          padding: '1rem',
          customClass: {
            popup: 'small-swal-popup',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la création du dossier:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.error.error || 'Une erreur est survenue. Veuillez vérifier les données saisies.',
          confirmButtonColor: '#d33',
          iconColor: '#d33',
          confirmButtonText: 'Réessayer',
          width: '400px',
          padding: '1rem',
          customClass: {
            popup: 'small-swal-popup',
          },
        });
      }
    });
  }

}
