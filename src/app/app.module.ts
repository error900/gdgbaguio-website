import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Config
import { ConfigModule } from './core/config/config.module';
// Modules
import { FormsModule } from '@angular/forms';
import { HomeModule } from './site/home.module';
// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ConfigModule,
    FormsModule,
    HomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
