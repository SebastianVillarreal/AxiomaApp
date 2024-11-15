import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbContextMenuModule, NbIconModule, NbToastrModule, NbToast } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { HttpClientModule } from '@angular/common/http';


import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { NgxAuthModule } from './auth/auth.module';
import { HeaderComponent } from './layout/components/header/header.component';
import { HomeComponent } from './modules/home/home.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { config } from 'rxjs';
import { BancosComponent } from './modules/pages/bancos/bancos.component';

@NgModule({
  declarations: [
    AppComponent,
    BancosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    HttpClientModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],
      forms: {},
    }),
    NgxAuthModule,
    HomeComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
