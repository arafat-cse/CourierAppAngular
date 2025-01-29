// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-tracking',
//   templateUrl: './tracking.component.html',
//   styleUrl: './tracking.component.css'
// })
// export class TrackingComponent {
//   trackingCode: string = '';
//   selectedParcel: any = null;

//   parcels = [
//     { 
//       trackingCode: '123ABC', 
//       sendingBranch: true, 
//       percelSendingDestribution: true, 
//       recebingDistributin: true, 
//       recebingBranch: true, 
//       recebingReceber: true 
//     },
//     { 
//       trackingCode: '456DEF', 
//       sendingBranch: true, 
//       percelSendingDestribution: true, 
//       recebingDistributin: false, 
//       recebingBranch: false, 
//       recebingReceber: false 
//     }
//   ];

//   searchParcel() {
//     this.selectedParcel = this.parcels.find(p => p.trackingCode === this.trackingCode);
//     if (!this.selectedParcel) {
//       alert('Tracking Code Not Found!');
//     }
//   }
// }
import { Component, Input } from '@angular/core';
import { Parcel } from '../interface/parcels';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent {
  @Input() parcel: Parcel[] = [];  // Parent থেকে Parcel Data আসবে
  trackingCode: string = '';
  selectedParcel: Parcel | null = null;

  searchParcel() {
    console.log(this.trackingCode);
    this.selectedParcel = this.parcel.find(p => p.trackingCode === this.trackingCode) || null;
    console.log(this.selectedParcel);
    if (!this.selectedParcel) {
      alert('❌ Tracking Code Not Found!');
    }
  }
}
