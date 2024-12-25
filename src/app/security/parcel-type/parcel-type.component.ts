import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-parcel-type',
  templateUrl: './parcel-type.component.html',
  styleUrls: ['./parcel-type.component.css']
})
export class ParcelTypeComponent implements OnInit {
  isList: boolean = true;
  isNew: boolean = true;
  parcelType: any = {
    parcelTypeId: 0,
    parcelTypeName: '',
    createBy: '',
    createDate: null,
    updateBy: '',
    updateDate: null,
    isActive: true
  };
  parcelTypes: any[] = [];
  toast!: toastPayload;

  //#region paging variables
  pageIndex: number = 0;
  pageSize: number = 10;
  rowCount: number = 0;
  listPageSize: number[] = [5, 10, 20];
  pageStart: number = 0;
  pageEnd: number = 0;
  totalRowsInList: number = 0;
  pagedItems: any[] = [];
  pager: {
    pages: any[],
    totalPages: number
  } = {
    pages: [],
    totalPages: 0
  };
  //#endregion

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    const headers = new HttpHeaders({
      'Token': this.authService.UserInfo?.Token || ''
    });

    const params = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
   
    this.httpClient.get(this.authService.baseURL + '/api/ParcelTypes', { headers, params })
      .subscribe(
        (res: any) => {
          this.parcelTypes = res.items || [];
          this.rowCount = res.totalCount || 0;
          this.calculatePagination();
        },
        (err) => {
          this.showMessage('error', `Failed to load parcel types: ${err?.error?.message || err.message}`);
        }
      );
  }

  calculatePagination(): void {
    this.pageStart = this.pageIndex * this.pageSize + 1;
    this.pageEnd = Math.min(this.pageStart + this.pageSize - 1, this.rowCount);
    this.totalRowsInList = this.rowCount;

    const totalPages = Math.ceil(this.rowCount / this.pageSize);
    this.pager.pages = Array.from({ length: totalPages }, (_, i) => i);
    this.pager.totalPages = totalPages;

    // Slice the data for the current page
    this.pagedItems = this.parcelTypes.slice(this.pageStart - 1, this.pageEnd);
  }

  changePageSize(): void {
    this.pageIndex = 0;
    this.get();
  }

  changePageNumber(pageIndex: number): void {
    if (pageIndex >= 0 && pageIndex < this.pager.totalPages) {
      this.pageIndex = pageIndex;
      this.get();
    }
  }

  search(){}



  add(): void {
    if (!this.validateForm()) {
      this.showMessage('error', 'Parcel type name is required.');
      return;
    }

    const headers = new HttpHeaders({
      'Token': this.authService.UserInfo?.Token || ''
    });

    const payload = {
      parcelTypeName: this.parcelType.parcelTypeName,
      createBy: this.authService.UserInfo?.UserID || 'System',
      createDate: new Date().toISOString(),
      isActive: this.parcelType.isActive
    };

    if (this.isNew) {
      this.httpClient.post(this.authService.baseURL + '/api/ParcelTypes', payload, { headers })
        .subscribe(
          () => {
            this.showMessage('success', 'Parcel type added successfully.');
            this.reset();
            this.get();
          },
          (err) => {
            this.showMessage('error', `Failed to add parcel type: ${err?.error?.message || err.message}`);
          }
        );
    } else {
      this.httpClient.put(this.authService.baseURL + `/api/ParcelTypes/${this.parcelType.parcelTypeId}`, payload, { headers })
        .subscribe(
          () => {
            this.showMessage('success', 'Parcel type updated successfully.');
            this.reset();
            this.get();
          },
          (err) => {
            this.showMessage('error', `Failed to update parcel type: ${err?.error?.message || err.message}`);
          }
        );
    }
  }

  edit(parcel: any): void {
    this.isNew = false;
    this.isList = false;
    this.parcelType = { ...parcel };
  }

  delete(parcelTypeId: number): void {
    const headers = new HttpHeaders({
      'Token': this.authService.UserInfo?.Token || ''
    });

    this.httpClient.delete(this.authService.baseURL + `/api/ParcelTypes/${parcelTypeId}`, { headers })
      .subscribe(
        () => {
          this.showMessage('success', 'Parcel type deleted successfully.');
          this.get();
        },
        (err) => {
          this.showMessage('error', `Failed to delete parcel type: ${err?.error?.message || err.message}`);
        }
      );
  }

  reset(): void {
    this.isNew = true;
    this.isList = true;
    this.parcelType = {
      parcelTypeId: 0,
      parcelTypeName: '',
      createBy: '',
      createDate: null,
      updateBy: '',
      updateDate: null,
      isActive: true
    };
  }

  validateForm(): boolean {
    return this.parcelType.parcelTypeName.trim().length > 0;
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
    this.commonService.showToast(this.toast);
  }
}
