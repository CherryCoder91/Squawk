import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { AuthErrorFriendlyPipe } from '../../../pipes/auth-error-friendly.pipe';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthService } from '../../../services/auth.service';

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

  public readonly supabaseService = inject(AuthService);

  public pageState = computed<'signedIn' | 'registering' | 'registered' | 'loading'>(() => {
    if (this.loading()) {
      return 'loading';
    }
    if (this.supabaseService.currentUserSignal() && !this.newAccount()) {
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
    private readonly navigationService: Router
  ) { }

  public ngOnInit(): void {
  }

  public async registerUser(): Promise<void> {
    if (this.password !== this.passwordConfirm) {
      this.errorCode = 'auth/passwords-do-not-match';
      return;
    }

    this.newAccount.set(true);
    this.loading.set(true);

    const { error } = await this.supabaseService.signUpWithEmail({
      name: this.username,
      email: this.email,
      password: this.password,
    });
    if (error) {
      this.errorCode = error.message;
      this.loading.set(false);
    } else {
      this.accountCreated.set(true);
      this.loading.set(false);
    }
  }

  public goToLoginPage(): void {
    this.navigationService.navigate(['/login']);
  }

  public logout(): void {
    this.supabaseService.signOut().then(({ error }) => { 
      if (error) {
        console.error('Logout error:', error);
      } else {
        console.log('Logout successful');
      }
    });
  }

  public continueAsSignedInUser(): void {
    this.navigationService.navigate(['/development-2']);
  }
}