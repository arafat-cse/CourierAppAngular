// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-parcel',
//   templateUrl: './parcel.component.html',
//   styleUrl: './parcel.component.css'
// })
// export class ParcelComponent {

// }
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.css'],
})
export class ParcelComponent implements OnInit {
  parcels: any[] = []; // Parcel list
  paginatedParcels: any[] = [];
  parcel: any = {}; // Current parcel
  parcelTypes = [
    { id: 1, name: 'Document' },
    { id: 2, name: 'Non-Document' },
    { id: 3, name: 'Other' },
  ];
  isFormVisible = false;
  isEditing = false;

  currentPage = 1;
  itemsPerPage = 5;

  ngOnInit(): void {
    // Load parcels (mock data or API call)
    this.parcels = this.loadMockData();
    this.updatePagination();
  }

  loadMockData() {
    return [
      {
        parcelId: 1,
        trackingCode: 'TRK123',
        senderCustomerName: 'John Doe',
        receiverCustomerName: 'Jane Smith',
        weight: 2,
        price: 200,
      },
      // Add more mock data here
    ];
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedParcels = this.parcels.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  showForm() {
    this.isFormVisible = true;
    this.isEditing = false;
    this.parcel = {};
  }

  editParcel(parcel: any) {
    this.isFormVisible = true;
    this.isEditing = true;
    this.parcel = { ...parcel };
  }

  saveParcel() {
    if (this.isEditing) {
      const index = this.parcels.findIndex(
        (p) => p.parcelId === this.parcel.parcelId
      );
      if (index > -1) {
        this.parcels[index] = this.parcel;
      }
    } else {
      this.parcel.parcelId = this.parcels.length + 1;
      this.parcels.push(this.parcel);
    }
    this.cancelForm();
    this.updatePagination();
  }

  deleteParcel(parcelId: number) {
    this.parcels = this.parcels.filter((p) => p.parcelId !== parcelId);
    this.updatePagination();
  }

  cancelForm() {
    this.isFormVisible = false;
    this.parcel = {};
  }

  get totalPages() {
    return Array(Math.ceil(this.parcels.length / this.itemsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }
}
