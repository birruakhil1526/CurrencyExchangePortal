import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HomePageComponent } from './home-page/home-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';

import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { UserRoutingModule } from './user/user-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
     UserRoutingModule,
     AdminRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
   
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
