import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  isList:boolean=true;
  isNew:boolean = true;
  phone:string = '';  
  toast!: toastPayload;

  constructor(private cs:CommonService,
    private httpClient: HttpClient,
    public authService:AuthService) { 
    this.get();
  }

  get():void{
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Companies',{headers:oHttpHeaders}).subscribe((res)=>{
        if(res) {
          this.listCompany = res;
        } else {
          this.showMessage('warning', 'Session expired, please login.');
        }
    });
  }

  edit(item: any):void {
    this.Company = { 
      companyId: item.companyId,
      companyName: item.companyName
    };
    this.isList = false;
  }

  validateForm():boolean{
    var isValid:boolean=true;
    if(this.Company.companyName==undefined||this.Company.companyName==null||this.Company.companyName==''){
      isValid = false;
      this.showMessage('warning', 'Company name is required.');
    }
    return isValid
  }

  reset(){
    this.Company={
        companyId:0,
        companyName:""
      };
  }

  search(){}

  // add():void{
  //   if(!this.validateForm()){
  //     this.showMessage('error', 'company name is required.');
  //     return;
  //   }    
  //   const oHttpHeaders = new HttpHeaders(
  //   {
  //       'Token':this.authService.UserInfo.Token
  //   });
  //   //this.Company.CreateBy = this.authService.UserInfo.UserID;
  //   this.httpClient.post(this.authService.baseURL + '/api/Companies', this.Company,{headers: oHttpHeaders}).subscribe((res) => {
  //     this.isList = true;
  //     this.get();
  //     this.showMessage('success', 'data added.');
  //   });
  // }

//   add():void {
//     if (!this.validateForm()) {
//         this.showMessage('error', 'company name is required.');
//         return;
//     }
//     const oHttpHeaders = new HttpHeaders({
//         'Token': this.authService.UserInfo.Token
//     });
//     const payload = {
//         companyName: this.Company.companyName,
//         createBy: this.authService.UserInfo.UserID,
//         createDate: new Date()
//     };
//     this.httpClient.post(this.authService.baseURL + '/api/Companies', payload, { headers: oHttpHeaders })
//         .subscribe(
//             (res) => {
//                 this.isList = true;
//                 this.get();
//                 this.showMessage('success', 'Data added.');
//             },
//             (err) => {
//                 this.showMessage('error', 'Failed to add data. ' + err.message);
//             }
//         );
// }

add(): void {
  if (!this.validateForm()) {
      this.showMessage('error', 'Company name is required.');
      return;
  }

  const oHttpHeaders = new HttpHeaders({
      'Token': this.authService.UserInfo.Token // নিশ্চিত করুন টোকেন সঠিক
  });

  // ডাটা পে-লোড প্রস্তুত করুন
  const payload = {
      companyName: this.Company.companyName, // শুধু CompanyName পাঠানোর চেষ্টা করুন
      createBy: this.authService.UserInfo.UserID || 'System', // ডিফল্ট হিসেবে 'System' ব্যবহার করুন
      createDate: new Date().toISOString() // বর্তমান তারিখ পাঠান
  };

  // POST রিকোয়েস্ট
  this.httpClient.post(this.authService.baseURL + '/api/Companies', payload, { headers: oHttpHeaders })
      .subscribe(
          (res) => {
              this.isList = true;
              this.get(); // ডাটা রিফ্রেশ করুন
              this.showMessage('success', 'Data added successfully.');
          },
          (err) => {
              this.showMessage('error', `Failed to add data: ${err.message}`);
          }
      );
}


  update():void{
    if(!this.validateForm()){
      return;
    }    
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    //this.Company.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/Companies/'+this.Company.companyId, this.Company,{headers: oHttpHeaders}).subscribe((res) => {
      this.isList = true;
      this.get();
      this.showMessage('success', 'data updated.');
    });
  }

  removeConfirm(company:{
    companyId:number,
    companyName:string
  }){
    this.Company.companyId=company.companyId;
    this.Company.companyName=company.companyName;
  }

  remove(Company:{
    companyId:number,
    companyName:string
  }){   
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    //this.Company.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.delete(this.authService.baseURL + '/api/Companies/'+Company.companyId,{headers: oHttpHeaders}).subscribe((res) => {
      this.isList = true;
      this.reset();
      this.get();
      this.showMessage('success', 'data updated.');
    });
  }


  listCompany:any=[];

  Company:{
    companyId:number,
    companyName:string
  }={
      companyId:0,
      companyName:""
    };

    //type: 'success', 'error', 'warning', 'info'
  //message: '<span>Action in '+type+'</span>',
  showMessage(type: string, message:string) {
    this.toast = {
      message:message,
      title: type.toUpperCase(),
      type: type,
      ic: {
        timeOut: 2500,
        closeButton: true,
      } as IndividualConfig,
    };
    this.cs.showToast(this.toast);
  }


  //#region paging varible
  pageIndex: number = 0;
  pageSize:number = 10;
  rowCount:number = 0;
  listPageSize:any = [5,10,20];
  pageStart:number = 0;
  pageEnd:number = 0;
  totalRowsInList:number=0;
  pagedItems:any = [];
  pager:{
    pages:any,
    totalPages:number
  } = {
    pages:[],
    totalPages:0
  };  

  changePageSize(){
    this.pageIndex = 0;
    this.get();
  }

  changePageNumber(pageIndex:number){
    this.pageIndex = pageIndex;
    this.get();
  }
  //#endregion
}

