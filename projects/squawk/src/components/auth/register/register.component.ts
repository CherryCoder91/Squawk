import { Component, computed, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthErrorFriendlyPipe } from '../../../pipes/auth-error-friendly.pipe';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'cherrycoder91-register',
  imports: [
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    AuthErrorFriendlyPipe,
    ProgressSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  public pageState = computed<'signedIn' | 'registering' | 'registered' | 'loading'>(() => {
    if (this.loading()) {
      return 'loading';
    }
    if (this.authService.currentUserSignal() && !this.newAccount()) {
      return 'signedIn';
    } else if (this.accountCreated()) {
      return 'registered';
    } else {
      return 'registering';
    }
  });

  public accountCreated = signal(false);
  private newAccount = signal(false);
  private loading = signal(false);


  public email: string = '';
  public password: string = '';
  public passwordConfirm: string = '';
  public username: string = '';
  public errorCode: string | null = null;


  public constructor(
    public readonly authService: AuthService,
    private readonly navigationService: Router
  ) { }

  public ngOnInit(): void {
  }

  public registerUser(): void {
    if (this.password !== this.passwordConfirm) {
      this.errorCode = 'auth/passwords-do-not-match';
      return;
    }

    this.newAccount.set(true);
    this.loading.set(true);
    this.authService.register(
      this.email,
      this.username,
      this.password
    ).subscribe({
      next: () => {
        console.log('Registration successful');
        this.accountCreated.set(true);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorCode = error.code;
        this.loading.set(false);
      }
    });
  }

  public goToLoginPage(): void {
    this.navigationService.navigate(['/login']);
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
}