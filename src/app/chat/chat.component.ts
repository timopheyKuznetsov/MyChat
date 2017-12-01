import { Component, OnInit } from '@angular/core';
import {AppService} from '../service/app.service';
import {ChatStreamComponent} from '../chat-stream/chat-stream.component';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  private doLogout() {

  }
}
