import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'cherrycoder91-register-page',
  imports: [
    ButtonModule,
    TextareaModule,
    FormsModule,
    CommonModule,
    InputTextModule
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage implements OnInit {

  // Direct injects not working, todo - why?.
  // private readonly authService = Inject(AuthService);
  // private readonly navigationService = Inject(Router);

  public errorCode: string | null = null;

  public email: string = '';
  public password: string = '';
  public username: string = '';

  public constructor(
    private readonly authService: AuthService,
    private readonly navigationService: Router
  ) { }

  public ngOnInit(): void {
  }

  public registerUser(): void {
    const email = 'email@example.com';
    const password = 'password';
    const username = 'username';
    this.authService.register(
      this.email,
      this.username,
      this.password
    ).subscribe({
      next: () => {
        console.log('Registration successful');
        this.navigationService.navigate(['/development-2']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorCode = error.code;
      }
    });
  }

}

