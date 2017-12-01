import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {Ng2Webstorage} from 'ng2-webstorage';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ChatComponent} from './chat/chat.component';
import {ChatStreamComponent} from './chat-stream/chat-stream.component';
import {UsersComponent} from './users/users.component';

import {AppService} from './service/app.service';
import {XHRHandler} from './service/xhrhandler.service';
import {AppDataService} from './service/appdata.service';
import {ChatWebsocketService} from './service/chatwebsocket.service';

@NgModule({
  declarations: [AppComponent, LoginComponent, ChatComponent, ChatStreamComponent, UsersComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2Webstorage,
    RouterModule.forRoot([
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'home', component: ChatComponent},
      {path: 'users', component: UsersComponent},
      {path: 'chat-stream', component: ChatStreamComponent}
    ])
  ],
  providers: [AppService, XHRHandler, AppDataService, ChatWebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
