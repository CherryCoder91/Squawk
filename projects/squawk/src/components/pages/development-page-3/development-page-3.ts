import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../envronments/environment';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'cherrycoder91-development-page-3',
  imports: [
    ButtonModule,
    TextareaModule,
    FormsModule,
    CommonModule,
    InputTextModule
  ],
  templateUrl: './development-page-3.html',
  styleUrl: './development-page-3.css'
})
export class DevelopmentPage3 implements OnInit, OnDestroy {

  private readonly client: SupabaseClient = inject(ClientService).getClient();
  private channel: RealtimeChannel | null = null;

  public ngOnInit(): void {
    this.channel = this.client.channel('room:lobby:messages', {
      config: {
        private: true,
        broadcast: {
          self: true,
          ack: true
        }
      },
    });

    this.channel
      .on('broadcast', { event: 'message_sent' }, (payload: { payload: any }) => {
        console.log('New message received:', payload);
        this.message.set(payload.payload.text);
      }).subscribe();

  }

  public ngOnDestroy(): void {
    this.channel?.unsubscribe();
  }

  public message = signal('This is a new signal!');
  public messageToSend = signal('');

  sendMessage(): void {
    this.channel?.send({
      type: 'broadcast',
      event: 'message_sent',
      payload: {
        text: this.messageToSend()
      },
    });
  }
}