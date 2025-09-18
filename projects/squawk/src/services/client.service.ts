import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../envronments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  private readonly supabaseClient: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  public getClient(): SupabaseClient {
    return this.supabaseClient;
  }
}