import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'cherrycoder91-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styles: [],
})
export class App implements OnInit {

  public constructor(private readonly authService: AuthService) { }

  public ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSignal.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUserSignal.set(null);
      }
      console.log('Current user:', this.authService.currentUserSignal());
    });
  }

}