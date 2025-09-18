import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseClient } from '@supabase/supabase-js';

import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { AuthService } from '../../../services/auth.service';
import { ClientService } from '../../../services/client.service';
import { PeerMediaService } from '../../../services/peer-media.service';

type UserStatus = {
  user: string | null | undefined,
  online_at: string
}

@Component({
  selector: 'cherrycoder91-development-page-4',
  imports: [
    ButtonModule,
    TextareaModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './development-page-4.html',
  styleUrl: './development-page-4.css'
})
export class DevelopmentPage4 implements OnInit {

  private authService = inject(AuthService);

  private readonly client: SupabaseClient = inject(ClientService).getClient();
  private channel = this.client.channel('squawk', {
    config: {
      private: true,
      broadcast: {
        self: false,
        ack: true
      }
    },
  });

  public localStream: any = null;

  public connections = new Map<string, PeerMediaService>();

  public ngOnInit(): void {
    this.initialize();
  }

  public async initialize(): Promise<void> {

    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    const userStatus: UserStatus = {
      user: this.authService.currentUserSignal()?.email,
      online_at: new Date().toISOString(),
    }

    this.channel.on('presence', { event: 'sync' }, () => {
      const newState = this.channel.presenceState();
      // send offers to all presences except yourself
      console.log('sync', newState)
    })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        const newUsers = this.parsePresenceInformation(newPresences);
        for(let newUser of newUsers) {
          console.log('New user joined:', newUser);
          const connection = this.getConnection(newUser);
          connection.createOffer().then(offer => { 
            this.channel.send({ type: 'broadcast', event: `${newUser}_offer`, payload: { offer, from: userStatus.user }});
          });
        }
        // Create an offer
        // Send an offer to the new presence except yourself
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('leave', key, leftPresences)
      })
      .on('broadcast', { event: `${userStatus.user}_offer` }, (response: {payload: { from: string, offer: any }}) => {
        console.log('New message received:', response);
        const connection = this.getConnection(response.payload.from);
        connection.createAnswer(response.payload.offer).then(answer => {
          this.channel.send({ type: 'broadcast', event: `${response.payload.from}_answer`, payload: { answer, from: userStatus.user }});
        });
        // Make new peer connection
        // Then you add the local stream tracks to that peer connection
        // Make a new remote stream for that specific connection
        // Add tracks to the remotestream when you receive them
        // Send an answer back to the caller with your details
      })
      .on('broadcast', { event: `${userStatus.user}_answer` }, (response: {payload: { from: string, answer: any }}) => {
        console.log('New message received:', response);
        const connection = this.getConnection(response.payload.from);
        connection.addAnswer(response.payload.answer);
        console.log('connection after answer', connection)
        // Set the remote description of the peer connection
      })
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') { return }
        const presenceTrackStatus = await this.channel.track(userStatus)
        console.log('presenceTrackStatus', presenceTrackStatus)
      });

  }

  public getConnection(connectionId: string): PeerMediaService {
    if (this.connections.has(connectionId)) {
      return this.connections.get(connectionId)!;
    } else {
      this.connections.set(connectionId, new PeerMediaService(this.localStream));
      return this.connections.get(connectionId)!;
    }
  }

  public parsePresenceInformation(presence: { [key: string]: UserStatus[]} | { [key: string]: any }[]): string[] {
    const userArrays = Object.keys(presence).map(key => presence[key]);
    const flatArray = userArrays.flat().filter((value) => value.user !== this.authService.currentUserSignal()?.email);
    return flatArray.map(userStatus => {
      if ('name' in userStatus) {
        return userStatus['name'];
      } else if ('user' in userStatus) {
        return userStatus['user'];
      }
    });
  } 

}

