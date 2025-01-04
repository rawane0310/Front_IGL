/**
 * Interface representing a nursing care record.
 */
export default interface SoinInfermier  {
    /**
     * Unique identifier for the nursing care record.
     */
    id: number ,

    /**
     * Date of the nursing care (formatted as a string, e.g., "YYYY-MM-DD").
     */
    date: string,

    /**
     * Unique identifier of the nurse who provided the care.
     */
    infirmier_id: number,

    /**
     * Last name of the nurse who provided the care.
     */
    infirmier_nom: string,

     /**
     * First name of the nurse who provided the care.
     */
    infirmier_prenom: string,

    /**
     * Time of the nursing care (formatted as a string, e.g., "HH:mm:ss").
     */
    heure: string,

    /**
     * Observations made by the nurse during the care (e.g., "Patient responded well to the treatment").
     */
    observation: string,

    /**
     * Description of the care provided (e.g., "Administered IV fluids", "Dressing change completed").
     */
    soin_realise: string,

    /**
     * ID of the associated patient file (dossier).
     */
    dossier_id: number
}