import { Inject, Injectable, signal } from '@angular/core';
import { Auth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, user} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly user$;
  public currentUserSignal = signal<IUser | null | undefined>(undefined);

  public constructor(private readonly firebaseAuth: Auth) {
    this.user$ = user(this.firebaseAuth);
  }

  public register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then((response: any) => updateProfile(response.user, { displayName: username }));
    return from(promise) as Observable<void>;
  }

  public login(email: string, password: string): Observable<UserCredential> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password);
    return from(promise) as Observable<UserCredential>;
  }

  public logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut();
    return from(promise) as Observable<void>;
  }
}
