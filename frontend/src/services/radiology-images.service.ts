import { Injectable, signal } from '@angular/core';
import { RadiologyImage } from '../models/Examen';

@Injectable({
  providedIn: 'root'
})
export class RadiologyImagesService {
  radiologyImages = signal<RadiologyImage[]>([])

  constructor() { }
}
