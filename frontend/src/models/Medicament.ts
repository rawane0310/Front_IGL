export default interface Medicament {
    id: number,
    nom: string,
    dose: string,
    frequence: string,
    duree: string,
    ordonnance_id: number | null,
    soin_id: number | null
}