import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Config
import { ConfigModule } from './core/config/config.module';
// Modules
import { TopBarModule } from './common-components/top-bar/top-bar.module';
import { SiteModule } from './site/site.module';
import { FooterModule } from './common-components/footer/footer.module';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ConfigModule,
    TopBarModule,
    SiteModule,
    FooterModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
