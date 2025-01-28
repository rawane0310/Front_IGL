import { Injectable , signal } from '@angular/core';
export  interface Resume {
  id:number,
  diagnostic: string ,
  symptomes: string ,
  mesures_prises: string,
  date_prochaine_consultation : string
}
@Injectable({
  providedIn: 'root'
})
export class ResumeServiceService {
  resumes = signal<Resume[]>([])
  constructor() { }
}
