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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { ParcelType } from '../interface/ParcelType';
import { Branch } from '../interface/listBranchs';
interface Parcel {
  parcelId: number; // Primary Key
  trackingCode: string; // Tracking Code (nvarchar)
  senderName: string | null; // Sender Name (varchar)
  senderPhone: number | null; // Sender Phone (int, nullable)
  senderAddress: string | null; // Sender Address (varchar, nullable)
  senderAlternativetoAddress: string | null; // Sender Alternative Address (varchar, nullable)
  receiverName: string | null; // Receiver Name (varchar, nullable)
  receiverPhone: number | null; // Receiver Phone (int, nullable)
  receiverEmail: string | null; // Receiver Email (varchar, nullable)
  receiverAddress: string | null; // Receiver Address (varchar, nullable)
  receiverAlternativetoAddress: string | null; // Receiver Alternative Address (varchar, nullable)
  senderCustomerId: number | null; // Sender Customer ID (int, nullable)
  sendTime: Date | null; // Parcel Send Time (datetime, nullable)
  receiverCustomerId: number | null; // Receiver Customer ID (int, nullable)
  receiveTime: Date | null; // Parcel Receive Time (datetime, nullable)
  senderBranchId: number | null; // Sender Branch ID (int, nullable)
  receiverBranchId: number | null; // Receiver Branch ID (int, nullable)
  estimatedReceiveTime: Date | null; // Estimated Receive Time (datetime, nullable)
  isPaid: boolean | false; // Payment Status (bit, nullable)
  price: number | null; // Parcel Price (decimal, nullable)
  weight: number | null; // Parcel Weight (float, nullable)
  createdBy: string | null; // Created By (nvarchar, nullable)
  createDate: Date | null; // Create Date (datetime, nullable)
  updatedBy: string | null; // Updated By (nvarchar, nullable)
  updateDate: Date | null; // Update Date (datetime, nullable)
  sendingBranch: boolean | null; // Sending Branch Status (bit, nullable)
  percelSendingDestribution: boolean | null; // Distribution Status during Sending (bit, nullable)
  recebingDistributin: boolean | null; // Distribution Status during Receiving (bit, nullable)
  recebingBranch: boolean | null; // Receiving Branch Status (bit, nullable)
  recebingReceber: boolean | null; // Receiving Receiver Status (bit, nullable)
  isActive: boolean | null; // Active Status (bit, nullable)
  vanId: number | null; // Van ID (int, nullable)
  driverId: number | null; // Driver ID (int, nullable)
  deliveryChargeId: number | null; // Delivery Charge ID (int, nullable)
  parcelTypeId: number | null; // Parcel Type ID (int, nullable)
}

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.css'],
})
export class ParcelComponent implements OnInit {
  isList: boolean = true;
  isNew: boolean = true;
  // Toast notification
  toast!: toastPayload;
  // Parcel Type data
  Listparcels: Parcel[] = [];
  parcelType: ParcelType[] = [];
  listBranchs: Branch[] = [];


  parcels: Parcel = {
    parcelId: 0,
    trackingCode: '',
    senderName: '',
    senderPhone: null, // Sender Phone (number | null)
    senderAddress: null, // Sender Address (string | null)
    senderAlternativetoAddress: null, // Sender Alternative Address (string | null)
    receiverName: null, // Receiver Name (string | null)
    receiverPhone: null, // Receiver Phone (number | null)
    receiverEmail: null, // Receiver Email (string | null)
    receiverAddress: null, // Receiver Address (string | null)
    receiverAlternativetoAddress: null, // Receiver Alternative Address (string | null)
    senderCustomerId: null, // Sender Customer ID (number | null)
    sendTime: null, // Send Time (Date | null)
    receiverCustomerId: null, // Receiver Customer ID (number | null)
    receiveTime: null, // Receive Time (Date | null)
    senderBranchId: null, // Sender Branch ID (number | null)
    receiverBranchId: null, // Receiver Branch ID (number | null)
    estimatedReceiveTime: null, // Estimated Receive Time (Date | null)
    isPaid: false, // Payment Status (boolean | null)
    price: null, // Price (number | null)
    weight: null, // Weight (number | null)
    createdBy: null, // Created By (string | null)
    createDate: null, // Create Date (Date | null)
    updatedBy: null, // Updated By (string | null)
    updateDate: null, // Update Date (Date | null)
    sendingBranch: null, // Sending Branch Status (boolean | null)
    percelSendingDestribution: null, // Percel Sending Distribution (boolean | null)
    recebingDistributin: null, // Receiving Distribution (boolean | null)
    recebingBranch: null, // Receiving Branch Status (boolean | null)
    recebingReceber: null, // Receiving Receiver Status (boolean | null)
    isActive: null, // Active Status (boolean | null)
    vanId: null, // Van ID (number | null)
    driverId: null, // Driver ID (number | null)
    deliveryChargeId: null, // Delivery Charge ID (number | null)
    parcelTypeId: null, // Parcel Type ID (number | null)
  };

  // Pagination
  pageIndex: number = 0;
  pageSize: number = 10;
  rowCount: number = 0;
  listPageSize: number[] = [5, 10, 20];
  pageStart: number = 0;
  pageEnd: number = 0;
  totalRowsInList: number = 0;
  pagedItems: any[] = [];
  pager: {
    pages: number[];
    totalPages: number;
  } = {
    pages: [],
    totalPages: 0,
  };
  price: number = 0;
  constructor(
    private cs: CommonService,
    private httpClient: HttpClient,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getParcel();
    this.getPercelType();
    this.getBranches();
    this. updatePrice();
  console.log(this.parcelType);
  }

  getParcel(): void {
    const headers = new HttpHeaders({
      Token: this.authService.UserInfo?.Token || '',
    });
    this.httpClient
      .get<any>(`${this.authService.baseURL}/api/Parcels`, { headers })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.Listparcels = response;
          //  this.rowCount = response.totalCount || 0;
          this.applyPaging();
        },
        error: () => {
          this.showMessage('error', 'Failed to load parcel types');
        },
      });
  }
  // parcels: Parcel = {
  //   parcelId: 0,
  //   trackingCode: '',
  //   parcelTypeId: null,
  //   weight: 1, // Default value set to 1
  //   price: null,
  //   isActive: true,
  // };

  
  updatePrice(): void {
    const selectedType = this.parcelType.find(pt => pt.parcelTypeId === this.parcels.parcelTypeId);
 console.log(this.parcelType)
    if (!selectedType) {
      this.price = 0;
      return;
    }
  
    // Calculate price based on selected type and weight
    if (this.parcels.weight && this.parcels.weight > 0) {
      this.price = selectedType.defaultPrice * this.parcels.weight;
      console.log(this.price)
    } else {
      this.price = selectedType.defaultPrice; // Default price if weight is not entered
      console.log(this.price)
    }
  }
  getPercelType(): void {
    const headers = new HttpHeaders({
      Token: this.authService.UserInfo?.Token || '',
    });
    this.httpClient
      .get<any>(`${this.authService.baseURL}/api/ParcelTypes`, { headers })
      .subscribe({
        next: (response) => {
          // if(response.isActive)
          // {

          // }

          this.parcelType = response;
         console.log(response);
          // for (let index = 0; index < response.length; index++) {
          //   const element = response[index];
          //   console.log(element.parcelTypeId);
          //   if(element.parcelTypeId == 1){
          //     this.price = 100;
          //   }else if(element.parcelTypeId == 4){
          //     this.price = 50;
          //   }else{
          //     0
          //   }
          // }
         
          //  console.log(response);

          //  this.rowCount = response.totalCount || 0;
          this.applyPaging();
        },
        error: () => {
          this.showMessage('error', 'Failed to load parcel types');
        },
      });
  }
  getBranches(): void {
    const headers = new HttpHeaders({
      Token: this.authService.UserInfo?.Token || '',
    });

    this.httpClient
      .get<{ status: boolean; message: string; content: Branch[] }>(
        `${this.authService.baseURL}/api/Branches`,
        { headers }
      )
      .subscribe({
        next: (response) => {
          if (response.status) {
            if (response.content) this.listBranchs = response.content;
            console.log(response.content);
            // this.rowCount = response.content.length;
            // this.paginate();
            // this.prepareDropdownBranches(response.content);
          } else {
            this.showMessage('warning', response.message);
          }
        },
        error: () => {
          this.showMessage('error', 'Failed to load branches');
        },
      });
  }
  //Brnach dropdwon
  selectedParentBranch: any = null;
  filteredChildBranches: any[] = [];
  onParentBranchChange(): void {
    if (this.selectedParentBranch) {
      this.filteredChildBranches =
        this.selectedParentBranch.childBranches || [];
    } else {
      this.filteredChildBranches = [];
    }
  }

  recevarSelectedParentBranch: any = null;
  recevarFilteredChildBranches: any[] = [];
  recevarParentBranchChange(): void {
    if (this.recevarSelectedParentBranch) {
      this.recevarFilteredChildBranches =
        this.recevarSelectedParentBranch.childBranches || [];
    } else {
      this.recevarFilteredChildBranches = [];
    }
  }

  edit(item: Parcel): void {
    this.parcels = {
      parcelId: item.parcelId,
      trackingCode: item.trackingCode,
      senderName: item.senderName,
      senderPhone: item.senderPhone,
      senderAddress: item.senderAddress,
      senderAlternativetoAddress: item.senderAlternativetoAddress,
      receiverName: item.receiverName,
      receiverPhone: item.receiverPhone,
      receiverEmail: item.receiverEmail,
      receiverAddress: item.receiverAddress,
      receiverAlternativetoAddress: item.receiverAlternativetoAddress,
      senderCustomerId: item.senderCustomerId,
      sendTime: item.sendTime,
      receiverCustomerId: item.receiverCustomerId,
      receiveTime: item.receiveTime,
      senderBranchId: item.senderBranchId,
      receiverBranchId: item.receiverBranchId,
      estimatedReceiveTime: item.estimatedReceiveTime,
      isPaid: item.isPaid,
      price: item.price,
      weight: item.weight,
      createdBy: item.createdBy,
      createDate: item.createDate,
      updatedBy: item.updatedBy,
      updateDate: item.updateDate,
      sendingBranch: item.sendingBranch,
      percelSendingDestribution: item.percelSendingDestribution,
      recebingDistributin: item.recebingDistributin,
      recebingBranch: item.recebingBranch,
      recebingReceber: item.recebingReceber,
      isActive: item.isActive,
      vanId: item.vanId,
      driverId: item.driverId,
      deliveryChargeId: item.deliveryChargeId,
      parcelTypeId: item.parcelTypeId,
    };
    this.isList = false;
  }
  //স্প্রেড অপারেটর সমাধান
  // edit(item: Parcel): void {
  //   this.parcels = { ...item };
  //   this.isList = false;
  // }

  // add(): void {
  //   if (!this.validateForm()) {
  //     return;
  //   }

  //   const headers = new HttpHeaders({
  //     'Token': this.authService.UserInfo?.Token,
  //     'Content-Type': 'application/json',
  //   });

  //   const payload = {
  //     ...this.parcels, // Include all necessary properties for a new parcel type
  //   };

  //   this.httpClient.post(
  //     `${this.authService.baseURL}/api/Parcels`,
  //     payload,
  //     { headers }
  //   ).subscribe({
  //     next: () => {
  //       this.reset();
  //       this.get();
  //       this.showMessage('success', 'Parcel type added successfully');
  //     },
  //     error: (error) => {
  //       this.showMessage('error', error.error || 'Failed to add parcel type');
  //     },
  //   });
  // }

  add(): void {
    if (!this.validateForm()) {
      return;
    }

    const token = this.authService.UserInfo?.Token || '';
    if (!token) {
      this.showMessage('error', 'Authentication token is missing');
      return;
    }

    const headers = new HttpHeaders({
      Token: token,
      'Content-Type': 'application/json',
    });

    const payload = {
      ...this.parcels, // Include all necessary properties for a new parcel type
    };

    this.httpClient
      .post(`${this.authService.baseURL}/api/Parcels`, payload, { headers })
      .subscribe({
        next: () => {
          this.isList = true;
          this.reset();
          this.getParcel();
          this.showMessage('success', 'Parcel added successfully');
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Failed to add parcel';
          this.showMessage('error', errorMessage);
        },
      });
  }

  // validateForm(): boolean {
  //   if (!this.parcels.trackingCode.trim()) {
  //     this.showMessage('warning', 'Parcel type name is required');
  //     return false;
  //   }
  //   return true;
  // }
  validateForm(): boolean {
    if (!this.parcels.trackingCode || !this.parcels.trackingCode.trim()) {
      this.showMessage('warning', 'Parcel tracking code is required');
      return false;
    }
    return true;
  }

  //update all
  update(): void {
    if (!this.validateForm()) {
      return;
    }

    const headers = new HttpHeaders({
      Token: this.authService.UserInfo?.Token,
    });

    console.log(this.parcels);

    // const payload = {
    //   parcelId: this.parcels.parcelId,
    //   trackingCode: this.parcels.trackingCode,
    //   senderName:this.parcels.senderName,
    //   isActive: this.parcels.isActive,
    // };

    const payload = {
      parcelId: this.parcels.parcelId, // Parcel ID
      trackingCode: this.parcels.trackingCode, // Tracking Code
      senderName: this.parcels.senderName, // Sender Name
      senderPhone: this.parcels.senderPhone, // Sender Phone
      senderAddress: this.parcels.senderAddress, // Sender Address
      senderAlternativetoAddress: this.parcels.senderAlternativetoAddress, // Sender Alternative Address
      receiverName: this.parcels.receiverName, // Receiver Name
      receiverPhone: this.parcels.receiverPhone, // Receiver Phone
      receiverEmail: this.parcels.receiverEmail, // Receiver Email
      receiverAddress: this.parcels.receiverAddress, // Receiver Address
      receiverAlternativetoAddress: this.parcels.receiverAlternativetoAddress, // Receiver Alternative Address
      senderCustomerId: this.parcels.senderCustomerId, // Sender Customer ID
      sendTime: this.parcels.sendTime, // Parcel Send Time
      receiverCustomerId: this.parcels.receiverCustomerId, // Receiver Customer ID
      receiveTime: this.parcels.receiveTime, // Parcel Receive Time
      senderBranchId: this.parcels.senderBranchId, // Sender Branch ID
      receiverBranchId: this.parcels.receiverBranchId, // Receiver Branch ID
      estimatedReceiveTime: this.parcels.estimatedReceiveTime, // Estimated Receive Time
      isPaid: this.parcels.isPaid, // Payment Status
      price: this.parcels.price, // Parcel Price
      weight: this.parcels.weight, // Parcel Weight
      createdBy: this.parcels.createdBy, // Created By
      createDate: this.parcels.createDate, // Create Date
      updatedBy: this.parcels.updatedBy, // Updated By
      updateDate: this.parcels.updateDate, // Update Date
      sendingBranch: this.parcels.sendingBranch, // Sending Branch Status
      percelSendingDestribution: this.parcels.percelSendingDestribution, // Distribution Status during Sending
      recebingDistributin: this.parcels.recebingDistributin, // Distribution Status during Receiving
      recebingBranch: this.parcels.recebingBranch, // Receiving Branch Status
      recebingReceber: this.parcels.recebingReceber, // Receiving Receiver Status
      isActive: this.parcels.isActive, // Active Status
      vanId: this.parcels.vanId, // Van ID
      driverId: this.parcels.driverId, // Driver ID
      deliveryChargeId: this.parcels.deliveryChargeId, // Delivery Charge ID
      parcelTypeId: this.parcels.parcelTypeId, // Parcel Type ID
    };

    console.log(payload);

    this.httpClient
      .put(
        `${this.authService.baseURL}/api/Parcels/${this.parcels.parcelId}`,
        payload,
        { headers }
      )
      .subscribe({
        next: () => {
          this.isList = true;
          this.getParcel();
          this.showMessage('success', 'Parcel type updated successfully');
        },
        error: (error) => {
          this.showMessage(
            'error',
            error.error || 'Failed to update parcel type'
          );
        },
      });
  }

  removeConfirm(parcel: Parcel): void {
    this.parcels = { ...parcel };
  }

  remove(parcel: Parcel): void {
    const headers = new HttpHeaders({
      Token: this.authService.UserInfo?.Token || '',
    });

    this.httpClient
      .delete(
        `${this.authService.baseURL}/api/ParcelTypes/${parcel.parcelId}`,
        { headers }
      )
      .subscribe({
        next: () => {
          this.reset();
          this.getParcel();
          this.showMessage('success', 'Parcel type deleted successfully');
        },
        error: () => {
          this.showMessage('error', 'Failed to delete parcel type');
        },
      });
  }

  showMessage(type: string, message: string): void {
    this.toast = {
      message: message,
      title: type.toUpperCase(),
      type: type,
      ic: {
        timeOut: 2500,
        closeButton: true,
      } as IndividualConfig,
    };
    this.cs.showToast(this.toast);
  }

  reset(): void {
    this.parcels = {
      parcelId: 0,
      trackingCode: '',
      createdBy: '', // Corrected property name
      createDate: null,
      updatedBy: '', // Corrected property name
      updateDate: null,
      isActive: true,
      senderName: '', // Add other mandatory properties as per the Parcel interface
      senderPhone: null,
      senderAddress: null,
      senderAlternativetoAddress: null,
      receiverName: null,
      receiverPhone: null,
      receiverEmail: null,
      receiverAddress: null,
      receiverAlternativetoAddress: null,
      senderCustomerId: null,
      sendTime: null,
      receiverCustomerId: null,
      receiveTime: null,
      senderBranchId: null,
      receiverBranchId: null,
      estimatedReceiveTime: null,
      isPaid: false,
      price: null,
      weight: null,
      sendingBranch: null,
      percelSendingDestribution: null,
      recebingDistributin: null,
      recebingBranch: null,
      recebingReceber: null,
      vanId: null,
      driverId: null,
      deliveryChargeId: null,
      parcelTypeId: null,
    };
  }

  applyPaging(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedItems = this.Listparcels.slice(start, end);
    this.calculatePages();
  }

  calculatePages(): void {
    this.pager.totalPages = Math.ceil(this.rowCount / this.pageSize);
    this.pager.pages = Array.from(Array(this.pager.totalPages).keys());
  }

  changePageSize(): void {
    this.pageIndex = 0;
    this.applyPaging();
  }

  changePageNumber(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.applyPaging();
  }
  search(): void {
    this.applyPaging();
  }

  
}
