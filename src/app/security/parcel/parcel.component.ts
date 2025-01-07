// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-parcel',
// //   templateUrl: './parcel.component.html',
// //   styleUrl: './parcel.component.css'
// // })
// // export class ParcelComponent {

// // }
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-parcel',
//   templateUrl: './parcel.component.html',
//   styleUrls: ['./parcel.component.css'],
// })
// export class ParcelComponent implements OnInit {
//   parcels: any[] = []; // Parcel list
//   paginatedParcels: any[] = [];
//   parcel: any = {}; // Current parcel
//   parcelTypes = [
//     { id: 1, name: 'Document' },
//     { id: 2, name: 'Non-Document' },
//     { id: 3, name: 'Other' },
//   ];
//   senderBranch = [
//     { id: 1, name: 'Dhaka' },
//     { id: 2, name: 'Khulna' },
//     { id: 3, name: 'Borishal' },
//     { id: 4, name: 'Satkhira' },
//     { id: 5, name: 'Gazipur' },
//     { id: 6, name: 'Nobinagar' },
//   ];
//   recebarBranch = [
//     { id: 1, name: 'Noiyakhali' },
//     { id: 2, name: 'Raishai' },
//     { id: 3, name: 'Rangpur' },
//   ];
//   isFormVisible = false;
//   isEditing = false;

//   currentPage = 1;
//   itemsPerPage = 5;

//   ngOnInit(): void {
//     // Load parcels (mock data or API call)
//     this.parcels = this.loadMockData();
//     this.updatePagination();
//   }

//   loadMockData() {
//     return [
//       {
//         parcelId: 1,
//         trackingCode: 'TRK123',
//         senderCustomerName: 'John Doe',
//         receiverCustomerName: 'Jane Smith',
     
//         price: 200,
//       },
//       // Add more mock data here
//     ];
//   }

//   updatePagination() {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     this.paginatedParcels = this.parcels.slice(
//       startIndex,
//       startIndex + this.itemsPerPage
//     );
//   }

//   changePage(page: number) {
//     this.currentPage = page;
//     this.updatePagination();
//   }

//   showForm() {
//     this.isFormVisible = true;
//     this.isEditing = false;
//     this.parcel = {};
//   }

//   editParcel(parcel: any) {
//     this.isFormVisible = true;
//     this.isEditing = true;
//     this.parcel = { ...parcel };
//   }

//   saveParcel() {
//     if (this.isEditing) {
//       const index = this.parcels.findIndex(
//         (p) => p.parcelId === this.parcel.parcelId
//       );
//       if (index > -1) {
//         this.parcels[index] = this.parcel;
//       }
//     } else {
//       this.parcel.parcelId = this.parcels.length + 1;
//       this.parcels.push(this.parcel);
//     }
//     this.cancelForm();
//     this.updatePagination();
//   }

//   deleteParcel(parcelId: number) {
//     this.parcels = this.parcels.filter((p) => p.parcelId !== parcelId);
//     this.updatePagination();
//   }

//   cancelForm() {
//     this.isFormVisible = false;
//     this.parcel = {};
//   }

//   get totalPages() {
//     return Array(Math.ceil(this.parcels.length / this.itemsPerPage))
//       .fill(0)
//       .map((x, i) => i + 1);
//   }
// }

// Demo 
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-parcel',
//   templateUrl: './parcel.component.html',
//   styleUrls: ['./parcel.component.css'],
// })
// export class ParcelComponent implements OnInit {
//   parcels: any[] = []; // All parcels
//   paginatedParcels: any[] = []; // Parcels for the current page
//   parcel: any = {}; // Current parcel object for form
//   parcelTypes = [
//     { id: 1, name: 'Document' },
//     { id: 2, name: 'Non-Document' },
//     { id: 3, name: 'Other' },
//   ];
//   senderBranch = [
//     { id: 1, name: 'Dhaka' },
//     { id: 2, name: 'Khulna' },
//     { id: 3, name: 'Barishal' },
//     { id: 4, name: 'Satkhira' },
//     { id: 5, name: 'Gazipur' },
//     { id: 6, name: 'Nabinagar' },
//   ];
//   recebarBranch = [
//     { id: 1, name: 'Noakhali' },
//     { id: 2, name: 'Comilla' },
//     { id: 3, name: 'Feni' },
//     { id: 4, name: 'Sylhet' },
//     { id: 5, name: 'Rangpur' },
//     { id: 6, name: 'Bogura' },
//   ];
//   isFormVisible: boolean = false; // To toggle form visibility
//   isEditing: boolean = false; // To check if it's editing mode
//   currentPage: number = 1; // Current pagination page
//   itemsPerPage: number = 5; // Items per page
//   totalPages: number[] = []; // Total pages

//   ngOnInit(): void {
//     this.loadParcels(); // Load initial data
//   }

//   // Load initial parcels (mock data for demonstration)
//   loadParcels(): void {
//     for (let i = 1; i <= 1; i++) {
//       this.parcels.push({
//         parcelId: i,
//         trackingCode: `TC-${i}`,
//         senderCustomerName: `Sender ${i}`,
//         senderTime: new Date(),
//         receiverCustomerName: `Receiver ${i}`,
//         receiverTime: new Date(),
//         senderBranch: this.senderBranch[i % this.senderBranch.length].name,
//         receiverBranch: this.recebarBranch[i % this.recebarBranch.length].name,
//         IsPaid: i % 2 === 0 ? 'Yes' : 'No',
//         price: (i * 100).toFixed(2),
//         SendingBranch: this.senderBranch[i % this.senderBranch.length].name,
//         PercelSendingDestribution: `Distribution ${i}`,
//         RecebingDistributin: `Receiving ${i}`,
//         RecebingBranch: this.recebarBranch[i % this.recebarBranch.length].name,
//         RecebingReceber: `Receiver ${i}`,
//         ParcelTypeId: this.parcelTypes[i % this.parcelTypes.length].id,
//         VanId: `Van-${i % 5}`,
//         DriverId: `Driver-${i % 10}`,
//       });
//     }
//     this.updatePagination();
//   }

//   // Toggle form visibility
//   showForm(): void {
//     this.isFormVisible = true;
//     this.parcel = {};
//     this.isEditing = false;
//   }

//   // Cancel form and return to the list view
//   cancelForm(): void {
//     this.isFormVisible = false;
//     this.parcel = {};
//   }

//   // Save parcel (add or update)
//   saveParcel(): void {
//     if (this.isEditing) {
//       // Update existing parcel
//       const index = this.parcels.findIndex((p) => p.parcelId === this.parcel.parcelId);
//       if (index !== -1) this.parcels[index] = { ...this.parcel };
//     } else {
//       // Add new parcel
//       this.parcel.parcelId = this.parcels.length + 1;
//       this.parcels.push({ ...this.parcel });
//     }
//     this.isFormVisible = false;
//     this.updatePagination();
//   }

//   // Edit parcel
//   editParcel(parcel: any): void {
//     this.isEditing = true;
//     this.isFormVisible = true;
//     this.parcel = { ...parcel }; // Create a copy of the parcel to edit
//   }

//   // Delete parcel
//   deleteParcel(parcelId: number): void {
//     if (confirm('Are you sure you want to delete this parcel?')) {
//       this.parcels = this.parcels.filter((p) => p.parcelId !== parcelId);
//       this.updatePagination();
//     }
//   }

//   // Pagination: update visible parcels
//   updatePagination(): void {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     const endIndex = startIndex + this.itemsPerPage;
//     this.paginatedParcels = this.parcels.slice(startIndex, endIndex);
//     this.totalPages = Array.from({ length: Math.ceil(this.parcels.length / this.itemsPerPage) }, (_, i) => i + 1);
//   }

//   // Change pagination page
//   changePage(page: number): void {
//     if (page < 1 || page > this.totalPages.length) return;
//     this.currentPage = page;
//     this.updatePagination();
//   }
// }

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.css'],
})
export class ParcelComponent implements OnInit {
  parcels: any[] = []; // সব পার্সেল ডেটা
  paginatedParcels: any[] = []; // পেজের জন্য পার্সেল ডেটা
  parcel: any = {}; // ফর্মের ডেটা সংরক্ষণের জন্য অবজেক্ট
  parcelTypes = [
    { id: 1, name: 'Document' },
    { id: 2, name: 'Non-Document' },
    { id: 3, name: 'Other' },
  ];
  senderBranch = [
    { id: 1, name: 'Dhaka' },
    { id: 2, name: 'Khulna' },
    { id: 3, name: 'Barishal' },
  ];
  recebarBranch = [
    { id: 1, name: 'Noakhali' },
    { id: 2, name: 'Comilla' },
    { id: 3, name: 'Sylhet' },
  ];
  isFormVisible: boolean = false;
  isEditing: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number[] = [];

  ngOnInit(): void {
    this.loadParcels();
  }

  // লোড ডেটা
 // Load initial parcels (mock data for demonstration)
 loadParcels(): void {
  console.log('Loading parcels...');
  const totalParcels = 3; // ডেমো ডেটার সংখ্যা
  for (let i = 1; i <= totalParcels; i++) {
    this.parcels.push({
      parcelId: i,
      trackingCode: `TCF97542`,
      senderName: `Arafat Rahman`,
      senderPhone: `01949201049 `,
      senderTime: new Date(),
      receiverName: `Samaul`,
      receiverPhone: `017458216`,
      receiverTime: new Date(),
      senderBranch: this.senderBranch[i % this.senderBranch.length].name,
      recebarBranch: this.recebarBranch[i % this.recebarBranch.length].name,
      IsPaid: i % 2 === 0 ? 'Yes' : 'No',
      price: (i * 100).toFixed(2),
      SendingBranch: this.senderBranch[i % this.senderBranch.length].name,
      PercelSendingDestribution: `Distribution ${i}`,
      RecebingDistributin: `Receiving ${i}`,
      RecebingBranch: this.recebarBranch[i % this.recebarBranch.length].name,
      RecebingReceber: `Receiver ${i}`,
      ParcelTypeId: this.parcelTypes[i % this.parcelTypes.length].id,
      Van: `Khulna-124`,
      deriver: `C-21564`,
      parcelType: `Non Document`,
    });
  }
  console.log('Parcels loaded:', this.parcels); // ডেটা কনসোল-এ দেখাবে
  this.updatePagination();
}

  // ফর্ম দেখানো
  showForm(): void {
    this.isFormVisible = true;
    this.parcel = {};
    this.isEditing = false;
  }

  // ফর্ম বাতিল
  cancelForm(): void {
    this.isFormVisible = false;
    this.parcel = {};
  }


  // ফর্ম থেকে ডেটা সেভ
  saveParcel(): void {
    console.log('Saving parcel:', this.parcel);
    if (this.isEditing) {
      const index = this.parcels.findIndex((p) => p.parcelId === this.parcel.parcelId);
      if (index !== -1) {
        this.parcels[index] = { ...this.parcel };
      }
    } else {
      this.parcel.parcelId = this.parcels.length + 1;
      this.parcel.senderTime = new Date(); // বর্তমান সময় সেভ
      this.parcel.senderBranch = this.parcel.senderBranch; // ID হিসাবে সেভ
      this.parcels.push({ ...this.parcel });
    }
    console.log('Updated parcels:', this.parcels); // সব ডেটা দেখাবে
    this.isFormVisible = false;
    this.updatePagination();
    console.log('Saving parcel:', this.parcel);

  }
  
  //get kora branch
getBranchNameById(branchId: number): string {
  const branch = this.senderBranch.find((b) => b.id === branchId);
  return branch ? branch.name : 'Unknown'; // যদি ID না মেলে, তাহলে 'Unknown' দেখাবে
}
  // এডিট
  editParcel(parcel: any): void {
    this.isEditing = true;
    this.isFormVisible = true;
    this.parcel = { ...parcel };
  }

  // ডিলিট
  deleteParcel(parcelId: number): void {
    if (confirm('Are you sure you want to delete this parcel?')) {
      this.parcels = this.parcels.filter((p) => p.parcelId !== parcelId);
      this.updatePagination();
    }
  }

  // পেজিনেশন আপডেট
  updatePagination(): void {
    console.log('Updating pagination...');
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedParcels = this.parcels.slice(startIndex, endIndex);
    this.totalPages = Array.from({ length: Math.ceil(this.parcels.length / this.itemsPerPage) }, (_, i) => i + 1);
    console.log('Paginated parcels:', this.paginatedParcels); // পেজের ডেটা দেখাবে
  }
  
  // পেজ চেঞ্জ
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    this.updatePagination();
  }
  //status change
  toggleValue(parcel: any, field: string) {
    if (parcel[field] === 'Yes') {
      parcel[field] = 'No';
    } else if (parcel[field] === 'No') {
      parcel[field] = 'Yes';
    }
  }
  
}

