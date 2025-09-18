import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { RegisterComponent } from '../../auth/register/register.component';

@Component({
  selector: 'cherrycoder91-register-page',
  imports: [
    ButtonModule,
    TextareaModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    RegisterComponent
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage { }