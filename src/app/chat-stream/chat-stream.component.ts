import {Component} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {Message} from '../data/message';
import {AppDataService} from '../service/appdata.service';
import {ChatWebsocketService} from '../service/chatwebsocket.service';

const WEBSOCKET_URL = 'ws://localhost:8080/reception';

@Component({
  selector: 'app-chat-stream',
  templateUrl: './chat-stream.component.html',
  styleUrls: ['./chat-stream.component.css']
})
export class ChatStreamComponent {

  public message = '';
  public messages: Subject<Message>;
  public publishedMessage: Message[] = new Array();
  public showTypingIndicator = false;
  public typingUser: string;
  public loggedinUserId: number;

  constructor(chatWSService: ChatWebsocketService,
              private appDataService: AppDataService) {

    this.messages = <Subject<Message>>chatWSService
                        .connect(WEBSOCKET_URL)
                        .map((response: MessageEvent): Message => {
                          const data = JSON.parse(response.data);
                          const message: Message = {
                            type: data.type,
                            from: data.from,
                            fromUserName: data.fromUserName,
                            message: data.message
                          };
                          return message;
                        });

    this.messages.subscribe(message => {
      if (message.type === 'CHAT_MESSAGE') {
        console.log('CHAT_MESSAGE');
        this.publishedMessage.push(message);
      } else if (message.type === 'USER_TYPING') {
        console.log('USER_TYPING');
        this.showUserTypingIndicator(message.fromUserName);
        setTimeout(this.hideUserTypingIndicator.bind(this), 1000);
      } else if (message.type === 'USER_ONLINE') {
        // not yet implemented
      } else if (message.type === 'USER_TYPING') {
        // not yet implemented
      }
    });

    this.loggedinUserId = this.appDataService.userId;
  }

  private sendMessage() {
    const msg = this.message;
    if (msg === '' || msg === undefined) {return; }

    const message: Message = {
      type: 'CHAT_MESSAGE',
      from: this.appDataService.userId,
      fromUserName: this.appDataService.userName,
      message: msg
    };
    this.messages.next(message);
    this.publishedMessage.push(message);
    this.message = '';
  }

  private sendTypeIndicator() {
    const message: Message = {
      type: 'USER_TYPING',
      from: this.appDataService.userId,
      fromUserName: this.appDataService.userName,
      message: null
    };
    this.messages.next(message);
  }

  private showUserTypingIndicator(userName: string) {
    this.typingUser = userName;
    this.showTypingIndicator = true;
  }

  private hideUserTypingIndicator() {
    if (this.showTypingIndicator) {
      this.showTypingIndicator = false;
    }
  }

}
