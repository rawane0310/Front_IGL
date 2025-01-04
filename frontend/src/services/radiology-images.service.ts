import { Injectable, signal } from '@angular/core';
import { RadiologyImage } from '../models/Examen';


/**
 * Service for managing radiology images.
 * 
 * This service is responsible for managing a list of radiology images. It stores the images in a signal,
 * which allows for dynamic updates and easy tracking of changes to the image list.
 * 
 * @service
 */
@Injectable({
  providedIn: 'root'
})
export class RadiologyImagesService {

   /**
   * A signal that holds the list of radiology images.
   * The list is dynamically updated as needed and can be accessed throughout the application.
   * 
   * @type {signal<RadiologyImage[]>}
   */
  radiologyImages = signal<RadiologyImage[]>([])


  /**
   * Initializes a new instance of the `RadiologyImagesService`.
   * This constructor sets up the service to manage the list of radiology images.
   * It initializes the `radiologyImages` signal, which will hold the list of radiology images.
   * 
   * @constructor
   */
  constructor() { }
}
