import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GameCardComponentComponent } from './game-card-component/game-card-component.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule } from '@angular/material/dialog';
import { RestartDialogComponentComponent } from './restart-dialog-component/restart-dialog-component.component'; 

@NgModule({
  declarations: [
    AppComponent,
    GameCardComponentComponent,
    RestartDialogComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
