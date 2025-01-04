import { Component, input, output } from '@angular/core';
import axios from 'axios';
import {Chart, registerables} from 'chart.js'
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';


// Register required chart.js modules
Chart.register(...registerables)

/**
 * Component for rendering a graphical representation of data using Chart.js.
 * It fetches data from the server and displays a stacked bar chart.
 * The chart is customizable with dynamic data based on the provided analysis ID.
 * @component
 */
@Component({
  selector: 'app-graphique',
  standalone: true,
  imports: [],
  templateUrl: './graphique.component.html',
  styleUrl: './graphique.component.css'
})
export class GraphiqueComponent {

  
   /**
   * Output event emitter to notify the parent component when the chart should be closed.
   * This emits an event when the user wants to close the chart view.
   * 
   * @output
   * @type {EventEmitter<void>}
   */
  closeEvent = output()

  /**
   * Input for the analysis ID used to fetch data for the chart.
   * This ID is required to pull the relevant data from the server.
   * 
   * @input
   * @type {number}
   */
  analyseId = input.required()

  /**
   * Instance of the Chart.js object for rendering the chart on the page.
   * 
   * @type {Chart}
   */
  chart: any;

  /**
   * Data fetched from the server to populate the chart.
   * 
   * @type {any}
   */

  chartData: any;



   /**
   * Configuration for the Chart.js chart, defining the chart's type, labels, datasets, and options.
   * This includes settings for stacked bars.
   * 
   * @type {any}
   */
  public config: any =  {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Cet Analyse',
        data: [], 
        backgroundColor: '#28a7b86a',
        borderColor: '#28A7B8', 
        borderWidth: 1
      }, {
        label: 'Analyse Précédent',
        data: [], 
        backgroundColor: '#05435e7b', 
        borderColor: '#05445E', 
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    }
  }


  /**
   * Constructor for injecting necessary services into the component.
   * 
   * @param {UserIndicatorsServiceService} userIndicatorService Service for handling user feedback, loading indicators, and error messages.
   */
  constructor(public userIndicatorService: UserIndicatorsServiceService){}

  
  /**
   * Fetches data for the chart from the server using the analysis ID.
   * Handles loading and error states, and returns the chart data on success.
   * 
   * @returns {Promise<any>} The fetched chart data or an error state if the request fails.
   */
  async fetchGraphiqueData(): Promise<any> {
    try {
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: true
      })

      const res = await axios.get('http://localhost:8000/examens/graphique-patient/'+this.analyseId()+'/',{
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('accessToken'),
          }
      })

      if (res.status === 200) return res.data
      else this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des données'
      })
      
    }
    catch (error) {
      console.log(error);
      this.userIndicatorService.errorData.set({
        isError: true,
        errorMessage: 'Erreur lors de la récupération des données'
      })
      
    }
    finally {
      this.userIndicatorService.loadingData.set({
        ...this.userIndicatorService.loadingData(),
        isLoading: false
      })
    }

  }


  /**
   * Initializes the component by fetching the chart data and rendering the chart.
   * This method is called when the component is initialized.
   * 
   * @async
   * @returns {Promise<void>}
   */
  async ngOnInit(): Promise<void> {
    this.chartData = await this.fetchGraphiqueData()
    this.config.data.labels = this.chartData.labels
    this.config.data.datasets[0].data = this.chartData.datasets[0].data
    this.config.data.datasets[1].data = this.chartData.datasets[1].data
    this.chart = new Chart('myChart', this.config);
  }

  
  /**
   * Closes the chart and emits the `closeEvent` to notify the parent component.
   * This method is called when the user wants to close the chart view.
   * 
   * @public
   * @method closeGraphique
   * @returns {void}
   */
  closeGraphique(){
    this.closeEvent.emit()
  }

}
