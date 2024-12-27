import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { CompanyComponent } from './security/company/company.component';
import { BranchComponent } from './security/branch/branch.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParcelTypeComponent } from './security/parcel-type/parcel-type.component';
import { DeliveryChargeComponent } from './security/delivery-charge/delivery-charge.component'
/*import { TestComponent } from '@angular/core/testing';*/

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch:'full' },
  //comment chilo
  //{ path: '**', redirectTo: '/login' },

  { path: 'company', component: CompanyComponent, canActivate:[authGuard] },
  { path: 'branch', component: BranchComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] },
  { path: 'parcel-type', component: ParcelTypeComponent, canActivate: [authGuard] },
  { path: 'delivery-charge', component: DeliveryChargeComponent, canActivate: [authGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
