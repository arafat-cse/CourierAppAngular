// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { IndividualConfig } from 'ngx-toastr';
// import { AuthService } from 'src/app/auth/auth.service';
// import { CommonService, toastPayload } from 'src/app/services/common.service';

// interface Branch {
//   BranchId: number;
//   BranchName: string;
//   ParentId: number;
//   isActive: boolean;
//   createBy?: string;
//   createDate?: Date | null;
//   updateBy?: string;
//   updateDate?: Date | null;
// }
// interface Branch {
//   branchId: number;
//   branchName: string;
//   address: string;
//   parentId: number | null;
//   childBranches: Branch[] | null;
//   isActive: boolean;
// }

// @Component({
//   selector: 'app-branch',
//   templateUrl: './branch.component.html',
//   styleUrls: ['./branch.component.css'],
// })
// export class BranchComponent implements OnInit {
//   // Display control
//   isList: boolean = true;

//   // Toast notification
//   toast!: toastPayload;

//   // Branch data
//   listBranchs: Branch[] = [];
//   branchs: Branch = {
//     BranchId: 0,
//     BranchName: '',
//     ParentId: 0,
//     isActive: true,
//   };

//   // Pagination
//   pageIndex: number = 0;
//   pageSize: number = 5;
//   pagedItems: Branch[] = [];
//   rowCount: number = 0;

//   constructor(
//     private cs: CommonService,
//     private httpClient: HttpClient,
//     public authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.getBranches();
//   }

//   // Fetch branches from API
//   // getBranches(): void {
//   //   const headers = new HttpHeaders({
//   //     'Token': this.authService.UserInfo?.Token || '',
//   //   });

//   //   this.httpClient.get<Branch[]>(`${this.authService.baseURL}/api/Branches`, { headers })
//   //     .subscribe({
//   //       next: (response) => {
//   //         this.listBranchs = response;
//   //         this.rowCount = response.length;
//   //         this.paginate();
//   //       },
       
//   //       error: () => {
//   //         this.showMessage('error', 'Failed to load branches');
//   //       },
//   //     });
//   //     console.log(this.getBranches)
//   // }

// // Store processed branches for dropdown
// dropdownBranches: any[] = [];

// getBranches(): void {
//   const headers = new HttpHeaders({
//     'Token': this.authService.UserInfo?.Token || '',
//   });

//   this.httpClient.get<any>(`${this.authService.baseURL}/api/Branches`, { headers })
//     .subscribe({
//       next: (response) => {
//         if (response.status) {
//           this.listBranchs = response.content; // Original response
//           this.prepareDropdownBranches(response.content); // Process for dropdown
//         } else {
//           this.showMessage('warning', response.message);
//         }
//       },
//       error: () => {
//         this.showMessage('error', 'Failed to load branches');
//       },
//     });
// }

// // Prepare branches for dropdown display
// prepareDropdownBranches(branches: any[]): void {
//   this.dropdownBranches = branches.map(branch => ({
//     label: branch.branchName,
//     value: branch.branchId,
//     children: branch.childBranches?.map(child => ({ label: child.branchName, value: child.branchId,
//     })),
//   }));
// }

  
//   // Add a new branch
//   add(): void {
//     if (!this.validateForm()) return;

//     const headers = new HttpHeaders({
//       Token: this.authService.UserInfo?.Token || '',
//       'Content-Type': 'application/json',
//     });

//     const payload = { ...this.branchs };

//     this.httpClient.post(`${this.authService.baseURL}/api/Branches`, payload, { headers })
//       .subscribe({
//         next: () => {
//           this.getBranches();
//           this.showMessage('success', 'Branch added successfully');
//           this.reset();
//         },
//         error: () => {
//           this.showMessage('error', 'Failed to add branch');
//         },
//       });
//   }

  
//   // Update an existing branch
//   update(): void {
//     if (!this.validateForm()) return;

//     const headers = new HttpHeaders({
//       Token: this.authService.UserInfo?.Token || '',
//     });

//     const payload = { ...this.branchs };

//     this.httpClient.put(`${this.authService.baseURL}/api/Branches/${this.branchs.BranchId}`, payload, { headers })
//       .subscribe({
//         next: () => {
//           this.getBranches();
//           this.showMessage('success', 'Branch updated successfully');
//           this.reset();
//         },
//         error: () => {
//           this.showMessage('error', 'Failed to update branch');
//         },
//       });
//   }

//   // Delete a branch
//   remove(branchId: Branch): void {
//     const headers = new HttpHeaders({
//       Token: this.authService.UserInfo?.Token || '',
//     });

//     this.httpClient.delete(`${this.authService.baseURL}/api/Branches/${branchId}`, { headers })
//       .subscribe({
//         next: () => {
//           this.getBranches();
//           this.showMessage('success', 'Branch deleted successfully');
//         },
//         error: () => {
//           this.showMessage('error', 'Failed to delete branch');
//         },
//       });
//   }

//   // Reset form
//   reset(): void {
//     this.branchs = {
//       BranchId: 0,
//       BranchName: '',
//       ParentId: 0,
//       isActive: true,
//     };
//     this.isList = true;
//   }

//   // Populate form for editing
//   edit(branch: Branch): void {
//     this.branchs = { ...branch };
//     this.isList = false;
//   }

//   // Validate form inputs
//   validateForm(): boolean {
//     if (!this.branchs.BranchName.trim()) {
//       this.showMessage('warning', 'Branch name is required');
//       return false;
//     }
//     return true;
//   }

//   // Display a toast message
//   showMessage(type: string, message: string): void {
//     this.toast = {
//       message,
//       title: type.toUpperCase(),
//       type,
//       ic: { timeOut: 2500, closeButton: true } as IndividualConfig,
//     };
//     this.cs.showToast(this.toast);
//   }

//   // Pagination logic
//   paginate(): void {
//     const start = this.pageIndex * this.pageSize;
//     this.pagedItems = this.listBranchs.slice(start, start + this.pageSize);
//   }

//   nextPage(): void {
//     if ((this.pageIndex + 1) * this.pageSize < this.listBranchs.length) {
//       this.pageIndex++;
//       this.paginate();
//     }
//   }

//   prevPage(): void {
//     if (this.pageIndex > 0) {
//       this.pageIndex--;
//       this.paginate();
//     }
//   }
// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService, toastPayload } from 'src/app/services/common.service';

interface Branch {
  branchId: number;
  branchName: string;
  address?: string;
  parentId: number | null;
  childBranches: Branch[] | null;
  isActive: boolean;
  createBy?: string;
  createDate?: Date | null;
  updateBy?: string;
  updateDate?: Date | null;
}

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent implements OnInit {
  // Display control
  isList: boolean = true;

  // Toast notification
  toast!: toastPayload;

  // Branch data
  listBranchs: Branch[] = [];
  branchs: Branch = {
    branchId: 0,
    branchName: '',
    createBy: "",
    address:"",
    parentId: null,
    childBranches: null,
    isActive: true,
  };

  // Dropdown branches
  dropdownBranches: { label: string; value: number; children?: { label: string; value: number }[] }[] = [];

  // Pagination
  pageIndex: number = 0;
  pageSize: number = 5;
  pagedItems: Branch[] = [];
  rowCount: number = 0;

  constructor(
    private cs: CommonService,
    private httpClient: HttpClient,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getBranches();
  }

  // Fetch branches from API
  getBranches(): void {
    const headers = new HttpHeaders({
      Token: this.authService.UserInfo?.Token || '',
    });

    this.httpClient.get<{ status: boolean; message: string; content: Branch[] }>(
      `${this.authService.baseURL}/api/Branches`,
      { headers }
    ).subscribe({
      next: (response) => {
        if (response.status) {
          this.listBranchs = response.content;
          // this.rowCount = response.content.length;
          this.paginate();
          this.prepareDropdownBranches(response.content);
        } else {
          this.showMessage('warning', response.message);
        }
      },
      error: () => {
        this.showMessage('error', 'Failed to load branches');
      },
    });
  }

  // Prepare branches for dropdown display
  prepareDropdownBranches(branches: Branch[]): void {
    this.dropdownBranches = branches.map(branch => ({
      label: branch.branchName,
      value: branch.branchId,
      children: branch.childBranches?.map(child => ({
        label: child.branchName,
        value: child.branchId,
      })),
    }));
  }

  // Add a new branch
  add(): void {
    if (!this.validateForm()) return;

    const headers = new HttpHeaders({
      Token: this.authService.UserInfo?.Token || '',
      'Content-Type': 'application/json',
    });

    const payload = { ...this.branchs };

    this.httpClient.post(`${this.authService.baseURL}/api/Branches`, payload, { headers })
      .subscribe({
        next: () => {
          this.getBranches();
          this.showMessage('success', 'Branch added successfully');
          this.reset();
        },
        error: () => {
          this.showMessage('error', 'Failed to add branch');
        },
      });
  }

  // Update an existing branch
  update(): void {
    if (!this.validateForm()) return;

    const headers = new HttpHeaders({
      Token: this.authService.UserInfo?.Token || '',
    });

    const payload = { ...this.branchs };

    this.httpClient.put(`${this.authService.baseURL}/api/Branches/${this.branchs.branchId}`, payload, { headers })
      .subscribe({
        next: () => {
          this.getBranches();
          this.showMessage('success', 'Branch updated successfully');
          this.reset();
        },
        error: () => {
          this.showMessage('error', 'Failed to update branch');
        },
      });
  }

  // Delete a branch
  remove(branchId: Branch): void {
    const headers = new HttpHeaders({
      Token: this.authService.UserInfo?.Token || '',
    });

    this.httpClient.delete(`${this.authService.baseURL}/api/Branches/${branchId}`, { headers })
      .subscribe({
        next: () => {
          this.getBranches();
          this.showMessage('success', 'Branch deleted successfully');
        },
        error: () => {
          this.showMessage('error', 'Failed to delete branch');
        },
      });
  }

  // Reset form
  reset(): void {
    this.branchs = {
      branchId: 0,
      branchName: '',
      parentId: null,
      childBranches: null,
      isActive: true,
    };
    this.isList = true;
  }

  // Populate form for editing
  edit(branch: Branch): void {
    this.branchs = { ...branch };
    this.isList = false;
  }

  // Validate form inputs
  validateForm(): boolean {
    if (!this.branchs.branchName.trim()) {
      this.showMessage('warning', 'Branch name is required');
      return false;
    }
    return true;
  }

  // Display a toast message
  showMessage(type: string, message: string): void {
    this.toast = {
      message,
      title: type.toUpperCase(),
      type,
      ic: { timeOut: 2500, closeButton: true } as IndividualConfig,
    };
    this.cs.showToast(this.toast);
  }

  // Pagination logic
  paginate(): void {
    const start = this.pageIndex * this.pageSize;
    this.pagedItems = this.listBranchs.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if ((this.pageIndex + 1) * this.pageSize < this.listBranchs.length) {
      this.pageIndex++;
      this.paginate();
    }
  }

  prevPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.paginate();
    }
  }
}
