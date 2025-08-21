import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'cherrycoder91-register-page',
  imports: [
    ButtonModule,
    TextareaModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage implements OnInit {

  public ngOnInit(): void {
  }

}

