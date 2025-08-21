import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthErrorFriendlyPipe } from '../../../pipes/auth-error-friendly.pipe';

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
export class LoginComponent  implements OnInit {

  public email: string = '';
  public password: string = '';
  public errorCode: string | null = null;

  public constructor(
    public readonly authService: AuthService,
    private readonly navigationService: Router
  ) { }


  public ngOnInit(): void {
  }

  public loginUser(): void {
    this.authService.login(this.email, this.password).subscribe({
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

  public continueAsSignedInUser(): void {
    this.navigationService.navigate(['/development-2']);
  }

  public goToRegisterPage(): void {
    this.navigationService.navigate(['/register']);
  }

}