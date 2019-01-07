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
import { FormsModule } from "@angular/forms";
import { MatButtonModule, MatCardModule, MatInputModule } from "@angular/material";

@NgModule({
    imports: [
        BrowserModule, BrowserAnimationsModule, FormsModule,
        MatButtonModule, MatCardModule, MatInputModule,

        NavbarModule, SenderModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        IndexComponent, PageNotFoundComponent,
    ],
    providers: [
        ContactsService,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
