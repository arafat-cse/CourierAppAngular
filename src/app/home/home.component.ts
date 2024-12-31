import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 constructor(private authService: AuthService, 
  private router: Router, 
  private cs:CommonService,
  private httpClient: HttpClient,
  private app:AppComponent) {
      this.router.navigate(['/home']);
    }
  }
