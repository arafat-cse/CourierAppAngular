import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { CompanyComponent } from './security/company/company.component';
import { BranchComponent } from './security/branch/branch.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
/*import { TestComponent } from '@angular/core/testing';*/

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch:'full' },
  //{ path: '**', redirectTo: '/login' },

  { path: 'company', component: CompanyComponent, canActivate:[authGuard] },
  { path: 'branch', component: BranchComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
