import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cherrycoder91-login-page',
  imports: [
    ButtonModule,
    TextareaModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage implements OnInit {

  public errorCode: string | null = null;


  public constructor(
    public readonly authService: AuthService,
    private readonly navigationService: Router
  ) { }


  public ngOnInit(): void {
  }

  public loginUser(): void {
    const email = 'email@example.com';
    const password = 'password';
    this.authService.login(email, password).subscribe({
      next: (userCredential) => {
        console.log('Login successful:', userCredential);
        this.navigationService.navigate(['/development-2']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorCode = error.code;
      }
    });
  }

  public logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
      },
      error: (error) => {
        console.error('Logout error:', error);
      }
    });
  }

}

