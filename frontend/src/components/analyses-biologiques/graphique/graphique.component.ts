import { Component, input, output } from '@angular/core';
import axios from 'axios';
import {Chart, registerables} from 'chart.js'
import { UserIndicatorsServiceService } from '../../../services/user-indicators-service.service';
Chart.register(...registerables)

@Component({
  selector: 'app-graphique',
  standalone: true,
  imports: [],
  templateUrl: './graphique.component.html',
  styleUrl: './graphique.component.css'
})
export class GraphiqueComponent {

  closeEvent = output()
  analyseId = input.required()

  constructor(public userIndicatorService: UserIndicatorsServiceService){}

  closeGraphique(){
    this.closeEvent.emit()
  }
  chartData : any
  chart: any 
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


  async ngOnInit(): Promise<void> {
    this.chartData = await this.fetchGraphiqueData()
    this.config.data.labels = this.chartData.labels
    this.config.data.datasets[0].data = this.chartData.datasets[0].data
    this.config.data.datasets[1].data = this.chartData.datasets[1].data
    this.chart = new Chart('myChart', this.config);
  }

}
