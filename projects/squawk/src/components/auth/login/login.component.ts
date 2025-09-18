import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AuthErrorFriendlyPipe } from '../../../pipes/auth-error-friendly.pipe';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'cherrycoder91-login',
  imports: [
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    AuthErrorFriendlyPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public readonly supabaseService = inject(AuthService);

  public email: string = '';
  public password: string = '';
  public errorCode: string | null = null;

  public constructor(
    private readonly navigationService: Router
  ) { }

  public ngOnInit(): void {
    this.supabaseService.getUser().then(() => {});
  }

  public async loginUser(): Promise<void> {
    const { error } = await this.supabaseService.signInWithEmail({
      email: this.email,
      password: this.password,
    });
    if (error) {
      this.errorCode = error.message;
    } else {
      console.log('Login successful:', this.email);
      this.navigationService.navigate(['/development-4']);
    }
  }

  public logout(): void {
    this.supabaseService.signOut().then(({ error }) => {
      if (error) {
        console.error('Error signing out:', error.message)
      } else {
        console.log('Sign-out successful');
      }
    });
  }

  public continueAsSignedInUser(): void {
    this.navigationService.navigate(['/development-4']);
  }

  public goToRegisterPage(): void {
    this.navigationService.navigate(['/register']);
  }

}