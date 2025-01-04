/**
 * Interface representing a medication prescribed to a patient.
 */
export default interface Medicament {
    /**
     * Unique identifier for the medication.
     */
    id: number,

    /**
     * Name of the medication (e.g., "Paracetamol", "Ibuprofen").
     */
    nom: string,

    /**
     * Dosage of the medication (e.g., "500mg", "10ml").
     */
    dose: string,

    /**
     * Frequency of administration (e.g., "Twice daily", "Every 8 hours").
     */
    frequence: string,


     /**
     * Duration of the medication course (e.g., "7 days", "2 weeks").
     */
    duree: string,

    /**
     * ID of the associated prescription (ordonnance), if available.
     * If no prescription is linked, this will be `null`.
     */
    ordonnance_id: number | null,

    /**
     * ID of the associated care or treatment (soin), if available.
     * If no care record is linked, this will be `null`.
     */
    soin_id: number | null
}