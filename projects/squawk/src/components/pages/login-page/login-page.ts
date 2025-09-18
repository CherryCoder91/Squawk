import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'cherrycoder91-login-page',
  imports: [
    ButtonModule,
    TextareaModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    LoginComponent,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {}