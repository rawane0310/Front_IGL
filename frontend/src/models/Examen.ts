
export interface Examen {
    id: number;
    date: string;
    description: string;
    dossier_patient: number; 
    technicien: number; 
    nom_medecin?: string; 
    prenom_medecin?: string; 
}
  
  
export interface AnalyseBiologique extends Examen {
    laborantin: number;
    nom_lab?: string; 
    prenom_lab?: string; 
}

export interface ResultatAnalyse {
    id: number;
    parametre: string;
    valeur: number;
    unite: string;
    commentaire: string;
    examen_biologique: number;
}

export interface ExamenRadiologique extends Examen {
    radiologue: number;
    compte_rendu: string;
}

export interface RadiologyImage {
    image: string;
    examen_radiologique: number;
    titre: string;
    uploaded_at: string;
}