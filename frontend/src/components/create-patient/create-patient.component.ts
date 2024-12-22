import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

/**
 * Type définissant les clés possibles pour les champs du formulaire d'un patient.
 * Chaque clé représente un champ spécifique dans le formulaire.
 */
type PatientFormKeys =
  | 'numSecuriteSocial'
  | 'nom'
  | 'prenom'
  | 'dateNaissance'
  | 'addresse'
  | 'numTelephone'
  | 'mutuelle'
  | 'medcinTraitant'
  | 'personneContacté';

/**
 * Interface représentant un champ dans le formulaire de création de patient.
 * Chaque champ est composé d'une clé correspondant à une `PatientFormKeys` et d'un `placeholder` pour l'affichage.
 */
interface Field {
  key: PatientFormKeys;        // La clé du champ (voir `PatientFormKeys`)
  placeholder: string;         // Texte affiché dans le champ (placeholder)
}

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
    numSecuriteSocial: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    addresse: '',
    numTelephone: '',
    mutuelle: '',
    medcinTraitant: '',
    personneContacté: '',
  };

  /**
   * Tableau `fields` qui contient les informations des champs du formulaire,
   * y compris la clé du champ et le texte à afficher comme `placeholder`.
   */
  fields: Field[] = [
    { key: 'numSecuriteSocial', placeholder: 'Numéro de sécurité sociale' },
    { key: 'nom', placeholder: 'Nom' },
    { key: 'prenom', placeholder: 'Prénom' },
    { key: 'dateNaissance', placeholder: 'Date de naissance' },
    { key: 'addresse', placeholder: 'Adresse' },
    { key: 'numTelephone', placeholder: 'Téléphone' },
    { key: 'mutuelle', placeholder: 'Mutuelle' },
    { key: 'medcinTraitant', placeholder: 'Médecin traitant' },
    { key: 'personneContacté', placeholder: 'Personne à contacter' }
  ];

 
  constructor() { }

  onSubmit() {
    console.log('Dossier Patient créé:', this.formData);
   
  }
}
