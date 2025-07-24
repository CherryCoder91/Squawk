import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'cherrycoder91-development-page',
  imports: [
    ButtonModule,
    TextareaModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './development-page.html',
  styleUrl: './development-page.css'
})
export class DevelopmentPage implements OnInit {

  public localStream: any = null;
  public remoteStream: any = null;
  public peerConnection: any = new RTCPeerConnection();
  public offerObjectString: any = signal(null);
  public answerObjectString: any = signal(null);


  public ngOnInit(): void {
    this.initialize();
  }

  public async initialize(): Promise<void> {
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    this.remoteStream = new MediaStream();

    this.localStream.getTracks().forEach((track: any) => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    this.peerConnection.ontrack = (event: any) => {
      event.streams[0].getTracks().forEach((track: any) => {
        this.remoteStream.addTrack(track);
      });
    };

  }

  public async createOffer(): Promise<void> {
    this.peerConnection.onicecandidate = async (event: any) => {
      if (event.candidate) {
        this.offerObjectString.set(JSON.stringify(this.peerConnection.localDescription));
        navigator.clipboard.writeText(this.offerObjectString());
      }
    };

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
  }

  public async createAnswer(): Promise<void> {

    let offer = JSON.parse(this.offerObjectString());

    this.peerConnection.onicecandidate = async (event:any) => {
        if(event.candidate){
            console.log('Adding answer candidate...:', event.candidate);
            this.answerObjectString.set(JSON.stringify(this.peerConnection.localDescription));
            navigator.clipboard.writeText(this.answerObjectString());
        }
    };

    await this.peerConnection.setRemoteDescription(offer);

    let answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
}

public async addAnswer(): Promise<void> {
    let answer = JSON.parse(this.answerObjectString());
    if (!this.peerConnection.currentRemoteDescription){
        this.peerConnection.setRemoteDescription(answer);
    }
}

}

