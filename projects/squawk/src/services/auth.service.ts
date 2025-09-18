import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IUser } from '../models/user.interface';
import { environment } from '../envronments/environment';

export type User = {
  id: string;
  email?: string;
  phone?: string;
  user_metadata: {
    displayName?: string;
  };
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly supabaseClient: SupabaseClient;
  public currentUserSignal = signal<IUser | null | undefined>(undefined);

  constructor() {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async signInWithEmail(payload: LoginPayload) {
    return await this.supabaseClient.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
  }

  async signUpWithEmail(payload: SignupPayload) {
    return await this.supabaseClient.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          displayName: payload.name,
        },
      },
    });
  }

  async getUser() {
    const userInfo = await this.supabaseClient.auth.getUser();

    if (userInfo.error || !userInfo.data.user) {
      this.currentUserSignal.set(null);
      return userInfo;
    }
    const user: IUser = { username: userInfo.data.user?.id as string, email: userInfo.data.user?.email as string };
    this.currentUserSignal.set(user);

    return userInfo;
  }

  async signOut() {
    this.currentUserSignal.set(null);
    return await this.supabaseClient.auth.signOut();
  }
}