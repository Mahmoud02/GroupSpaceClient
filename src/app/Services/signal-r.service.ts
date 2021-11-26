import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {HttpClient, HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {Observable, of, Subject} from 'rxjs';
import {ChatMessage} from '../models/IChat';
import {OAuthService} from 'angular-oauth2-oidc';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  messageReceived = new EventEmitter<ChatMessage>();
  connectionEstablished = new EventEmitter<boolean>();
  private connectionIsEstablished = false;
  // @ts-ignore
  private hubConnection: HubConnection ;
  private apiUrl = 'https://localhost:44306/api/chat';
  private connectionUrl = 'https://localhost:44306/groupchat';

  constructor(   private oauthService: OAuthService) {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();

  }
  sendMessage(groupId: string, message: ChatMessage): void {
    this.hubConnection.invoke('SendMessage', groupId, message);
  }
  addUserToGroupChat(groupId: string , sub: string ): void {
    this.hubConnection.invoke('AddToGroup', groupId, sub);
  }

  private createConnection(): void  {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.connectionUrl)
      .build();
  }

  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        // tslint:disable-next-line:typedef
        setTimeout(() => { this.startConnection(); }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('MessageReceived', (data: any) => {
      this.messageReceived.emit(data);
    });
  }
}
