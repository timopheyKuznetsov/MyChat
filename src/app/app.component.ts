import { Component } from '@angular/core';
import {LoginComponent} from './login/login.component';
import {ChatComponent} from './chat/chat.component';


@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  templateUrl: './app.component.html',
  entryComponents: [LoginComponent, ChatComponent],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
