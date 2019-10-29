import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {ChartsModule} from "ng2-charts";
import {NbChatModule, NbThemeModule, NbLayoutModule} from "@nebular/theme";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
      SocketIoModule.forRoot(config),
      ChartsModule,
      NbChatModule,
      NoopAnimationsModule,
      NbThemeModule.forRoot({ name: 'default' }),
      NbLayoutModule,
      NbEvaIconsModule,
      AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
