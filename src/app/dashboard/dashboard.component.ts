// //import { Component } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
// // import { ChartDataSets, ChartOptions } from 'chart.js';
// // import { Color, Label } from 'ng2-charts';

// @Component({
//   selector: 'app-dnpm install chart.jsashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent {
//   constructor() { 
    
//   }

//   ngOnInit() {
//   }

  
// }
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats = [
    { value: 40, label: 'Total Staff', bgClass: 'bg-warning text-white' },
    { value: 42, label: 'Total Drivers', bgClass: 'bg-primary text-white' },
    { value: 150, label: 'Total vehicle', bgClass: 'bg-success text-white' },
    { value: 170, label: 'Total Branch', bgClass: 'bg-secondary text-white' },
  ];

  recentRides = [
    {
      id: 'ST747487459',
      rider: 'Randy Aminoff',
      driver: 'Jaylon Carder',
      location: 'Location 1 with complete address',
      date: '12 May 2021, 5:45',
      fare: '$453',
    },
    {
      id: 'ST847123456',
      rider: 'Alice Brown',
      driver: 'Michael Lee',
      location: 'Location 2 with complete address',
      date: '15 May 2021, 3:20',
      fare: '$275',
    },
  ];

  constructor() { }

  ngOnInit(): void {
    // Register Chart.js components
    Chart.register(...registerables);
    this.loadCharts();
  }

  loadCharts(): void {
    const rideCtx = document.getElementById('rideChart') as HTMLCanvasElement;
    const rideChart = new Chart(rideCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
          label: 'delivery',
          data: [800, 1500, 1200, 2000, 1800, 900, 1300, 1700, 1500],
          borderColor: 'green',
          tension: 0.4,
          fill: false,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          }
        }
      }
    });

    const driverCtx = document.getElementById('driverChart') as HTMLCanvasElement;
    const driverChart = new Chart(driverCtx, {
      type: 'doughnut',
      data: {
        labels: ['On Delivery', 'Compelete'],
        datasets: [{
          data: [28, 4],
          backgroundColor: ['#007bff', '#ffc107']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    });
  }
}
