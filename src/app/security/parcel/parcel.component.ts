import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { ParcelType } from '../interface/ParcelType';
import { Branch } from '../interface/listBranchs';
import { Parcels } from '../interface/parcel';
import jsPDF from 'jspdf';


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
    estimatedReceiveTime: new Date(), // Estimated Receive Time (Date | null)
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
          this.showMessage('error', 'Failed to load parcel ');
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
    // Get branch name by ID
    getParcelTypeName(parcelTypeId: number | null): string {
      if (parcelTypeId === null) return 'N/A';
      const branch = this.parcelType.find(b => b.parcelTypeId === parcelTypeId);
      return branch ? branch.parcelTypeName : 'Unknown';
    }
  // ----------------------------------------ParcelType----------------------------
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
   // Get branch name by ID
   getBranchName(branchId: number | null): string {
    if (branchId === null) return 'N/A';
    const branch = this.listBranchs.find(b => b.branchId === branchId);
    return branch ? branch.branchName : 'Unknown';
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



// -------------------------------------From Validation-----------------------


  // validateForm(): boolean {
  //   if (!this.parcels.trackingCode || !this.parcels.trackingCode.trim()) {
  //     this.showMessage('warning', 'Parcel tracking code is required');
  //     return false;
  //   }
  //   return true;
  // }
  validateForm(): boolean {
        // Tracking Code Validation
    if (!this.parcels.trackingCode || !this.parcels.trackingCode.trim()) {
      this.showMessage('warning', 'Parcel tracking code is required');
      return false;
    }
    // Sender Validation
    if (!this.parcels.senderName || !this.parcels.senderName.trim()) {
      this.showMessage('warning', 'Sender Name is required');
      return false;
    }
    if (!this.parcels.senderPhone || !this.parcels.senderPhone.toString().trim()) {
      this.showMessage('warning', 'Sender Phone is required');
      return false;
    }
 
    // if (!this.parcels.senderAddress || !this.parcels.senderAddress.trim()) {
    //   this.showMessage('warning', 'Sender Address is required');
    //   return false;
    // }
    // if (!this.parcels.senderAlternativetoAddress || !this.parcels.senderAlternativetoAddress.trim()) {
    //   this.showMessage('warning', 'Sender Alternative Address is required');
    //   return false;
    // }
  
    // Receiver Validation
    if (!this.parcels.receiverName || !this.parcels.receiverName.trim()) {
      this.showMessage('warning', 'Receiver Name is required');
      return false;
    }
    if (!this.parcels.receiverPhone || !this.parcels.receiverPhone.toString().trim()) {
      this.showMessage('warning', 'Receiver Phone is required');
      return false;
    }
    if (!this.parcels.receiverEmail || !this.parcels.receiverEmail.trim()) {
      this.showMessage('warning', 'Receiver Email is required');
      return false;
    }
    // if (!this.parcels.receiverAddress || !this.parcels.receiverAddress.trim()) {
    //   this.showMessage('warning', 'Receiver Address is required');
    //   return false;
    // }
    // if (!this.parcels.receiverAlternativetoAddress || !this.parcels.receiverAlternativetoAddress.trim()) {
    //   this.showMessage('warning', 'Receiver Alternative Address is required');
    //   return false;
    // }
    // If all fields are valid
    return true;
  }
  // -------------------------------------From Validation-----------------------
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
          this.showMessage('success', 'Parcel updated successfully');
        },
        error: (error) => {
          this.showMessage(
            'error',
            error.error || 'Failed to update parcel '
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
          this.showMessage('success', 'Parcel deleted successfully');
        },
        error: () => {
          this.showMessage('error', 'Failed to delete parcel ');
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
//Model Data Uthano
  selectedParcel: any = null;

  selectParcel(parcel: any): void {
    this.selectedParcel = parcel;
  }
  //  // Method to generate PDF for a single row
  //  generatePDF(parcel: any) {
  //   const doc = new jsPDF();


  //   // Define the content of the PDF
  //   const content = `
  //     Parcel Invoice
  //     -------------------------------
  //     Tracking Code: ${parcel.trackingCode}
  //     Sender Name: ${parcel.senderName}
  //     Sender Phone: ${parcel.senderPhone}
  //     Receiver Name: ${parcel.receiverName}
  //     Receiver Phone: ${parcel.receiverPhone}
  //     Sender Branch: ${this.getBranchName(parcel.senderBranchId)}
  //     Receiver Branch: ${this.getBranchName(parcel.receiverBranchId)}
  //     Is Paid: ${parcel.isPaid ? 'YES' : 'NO'}
  //     Parcel Type: ${this.getParcelTypeName(parcel.parcelTypeId)}
  //     Status: ${parcel.isActive ? 'Active' : 'Inactive'}
  //   `;

  //   // Add content to PDF
  //   doc.text(content, 10, 10);

  //   // Save the PDF
  //   doc.save(`Parcel_${parcel.trackingCode}.pdf`);
  // }
  generatePDF(parcel: any) {
    const doc = new jsPDF();
  
    // Set company details at the top
    const companyLogo = 'data:image/png;base64,...'; // Replace with your Base64 logo
    //doc.addImage(companyLogo, 'PNG', 10, 10, 30, 15); // x, y, width, height
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Parcel Invoice', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('SmartCourier', 105, 26, { align: 'center' });
    doc.text('Address: Shawrapara, Mirpur-12, Dhaka, Bangladesh', 105, 32, { align: 'center' });
    doc.text('Phone: 01949201049 | Email: info@smartcourier.com', 105, 38, { align: 'center' });
  
    // Draw a separator line
    doc.setDrawColor(0, 0, 0);
    doc.line(10, 45, 200, 45); // x1, y1, x2, y2
  
    // Add sender information
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Sender Information', 10, 55);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Name: ${parcel.senderName}`, 10, 62);
    doc.text(`Phone: ${parcel.senderPhone}`, 10, 68);
    doc.text(`Branch: ${this.getBranchName(parcel.senderBranchId)}`, 10, 74);
  
    // Add receiver information
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Receiver Information', 10, 85);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Name: ${parcel.receiverName}`, 10, 92);
    doc.text(`Phone: ${parcel.receiverPhone}`, 10, 98);
    doc.text(`E-mail: ${parcel.receiverEmail}`, 10, 98);
    doc.text(`Branch: ${this.getBranchName(parcel.receiverBranchId)}`, 10, 104);
  
    // Add parcel details
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Parcel Details', 10, 115);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Tracking Code: ${parcel.trackingCode}`, 10, 122);
    doc.text(`Type: ${this.getParcelTypeName(parcel.parcelTypeId)}`, 10, 128);
    doc.text(`Paid: ${parcel.isPaid ? 'YES' : 'NO'}`, 10, 134);
    doc.text(`Status: ${parcel.isActive ? 'Active' : 'Inactive'}`, 10, 140);
  
    // Footer with date
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Generated on: ${currentDate}`, 10, 285); // Bottom-left corner
    doc.text('Thank you for choosing our service!', 105, 285, { align: 'center' });
  
    // Save the PDF
    doc.save(`Parcel_${parcel.trackingCode}.pdf`);
  }
  
  
}
