import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ChatMessage} from '../../models/IChat';
import {SignalRService} from '../../Services/signal-r.service';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  title = 'ClientApp';
  txtMessage = 'test';
  // uniqueID: string = new Date().getTime().toString();
  messages = new Array<ChatMessage>();
  message = new ChatMessage();
  @Input() groupId = '';
  userId: any;

  constructor(
    private chatService: SignalRService,
    private ngZone: NgZone,
    private oauthService: OAuthService

  ) {
    this.subscribeToEvents();
    this.subscribeToGroupChat();
    const claims: any = this.oauthService.getIdentityClaims();
    this.userId = claims.sub;
  }
  ngOnInit(): void {
  }
  sendMessage(): void {

    if (this.txtMessage) {
      this.message = new ChatMessage();
      this.message.sub = this.userId;
      this.message.message = this.txtMessage;
      // this.messages.push(this.message);
      this.chatService.sendMessage(this.groupId, this.message);
      this.txtMessage = '';
    }
  }
  private subscribeToEvents(): void {

    this.chatService.messageReceived.subscribe((message: ChatMessage) => {
      this.ngZone.run(() => {
        /*if (message.sub !== this.userId) {
          message.type = 'received';
          this.messages.push(message);
        }*/
        this.messages.push(message);
      });
    });
  }
  private subscribeToGroupChat(): void {
    this.chatService.connectionEstablished.subscribe((value) => {
      this.chatService.addUserToGroupChat(this.groupId, this.userId);
    });
  }
}
