import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from "./navbar/navbar.module";
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SenderModule } from "./sender/sender.module";
import { ContactsService } from "./sender/contacts.service";
import { ReactiveFormsModule } from "@angular/forms";
import {
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTreeModule
} from "@angular/material";
import { AuthService } from "./auth.service";
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

// FontAwesome icons
library.add(fas);

// AppModule
@NgModule({
    imports: [
        BrowserModule, BrowserAnimationsModule, ReactiveFormsModule,
        MatButtonModule, MatCardModule, MatInputModule, MatSidenavModule, MatToolbarModule, MatTreeModule,
        FontAwesomeModule,

        NavbarModule, SenderModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        IndexComponent, PageNotFoundComponent, LoginComponent,
    ],
    providers: [
        ContactsService, AuthService,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
