import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SenderRoutingModule } from "./sender-routing.module";
import { HttpClientModule, HttpClientXsrfModule } from "@angular/common/http";
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatTableModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { ContactFormComponent } from './contact-form/contact-form.component';
import { GmailContactFormComponent } from "./gmail-contact-form/gmail-contact-form.component";

@NgModule({
    imports: [
        CommonModule, ReactiveFormsModule, HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'csrftoken',
            headerName: 'X-CSRFToken',
        }),
        MatButtonModule, MatCardModule, MatInputModule, MatTableModule,
        SenderRoutingModule
    ],
    providers: [
        CookieService,
    ],
    declarations: [
        ContactListComponent,
        ContactDetailsComponent,
        ContactFormComponent, GmailContactFormComponent
    ]
})
export class SenderModule { }
