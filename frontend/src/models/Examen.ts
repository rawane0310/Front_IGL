/**
 * Base interface representing a general medical examination.
 */
export interface Examen {
    /**
     * Unique identifier for the examination.
     */
    id: number;
  
    /**
     * Date when the examination was conducted, in ISO 8601 format (YYYY-MM-DD).
     */
    date: string;
  
    /**
     * Detailed description of the examination.
     */
    description: string;
  
    /**
     * ID of the patient's medical record associated with this examination.
     */
    dossier_patient: number;
  
    /**
     * ID of the technician who conducted or assisted with the examination.
     */
    technicien: number;
  
    /**
     * Last name of the doctor overseeing the examination (optional).
     */
    nom_medecin?: string;
  
    /**
     * First name of the doctor overseeing the examination (optional).
     */
    prenom_medecin?: string;
  }
  
  



/**
 * Interface representing a biological analysis, which is a specialized type of examination.
 */
export interface AnalyseBiologique extends Examen {
   /**
     * ID of the lab technician responsible for conducting the analysis.
     */
    laborantin: number;

    /**
     * Last name of the lab technician (optional).
     */
    nom_lab?: string; 

    /**
     * First name of the lab technician (optional).
     */
    prenom_lab?: string; 
}



/**
 * Interface representing the result of a biological analysis.
 */
export interface ResultatAnalyse {
    /**
     * Unique identifier for the result.
     */
    id: number;

    /**
     * Name of the parameter being analyzed (e.g., "Glucose", "Cholesterol").
     */
    parametre: string;

    /**
     * Numeric value of the result for the specified parameter.
     */
    valeur: number;

    /**
     * Unit of measurement for the result value (e.g., "mg/dL", "g/L").
     */
    unite: string;

    /**
     * Optional comments or observations about the result.
     */
    commentaire: string;

    /**
     * ID of the related biological examination.
     */
    examen_biologique: number;
}


/**
 * Interface representing a radiological examination, which is a specialized type of examination.
 */
export interface ExamenRadiologique extends Examen {

    /**
     * ID of the radiologist responsible for the examination.
     */
    radiologue: number;


    /**
     * Last name of the radiologist (optional).
     */
    nom_radiologue?: string; 

    /**
     * First name of the radiologist (optional).
     */
    prenom_radiologue?: string;

    /**
     * The radiologist's report summarizing the findings of the examination.
     */
    compte_rendu: string;
}


/**
 * Interface representing an image associated with a radiological examination.
 */
export interface RadiologyImage {
    /**
     * Unique identifier for the radiology image.
     */
    id: number;

    /**
     * URL of the radiology image.
     */
    image: string;

    /**
     * ID of the related radiological examination.
     */
    examen_radiologique: number;

    /**
     * Title or caption for the radiology image.
     */
    titre: string;

    /**
     * Date and time when the image was uploaded, in ISO 8601 format.
     */
    uploaded_at: string;
}