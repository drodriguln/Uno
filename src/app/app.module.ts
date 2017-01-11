import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PileComponent } from './pile/pile.component';
import { PlayerComponent } from './player/player.component';
import { OpponentComponent } from './opponent/opponent.component';

@NgModule({
  declarations: [
    AppComponent,
    PileComponent,
    PlayerComponent,
    OpponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
