import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {ChartsModule} from "ng2-charts";

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
      SocketIoModule.forRoot(config),
      ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
