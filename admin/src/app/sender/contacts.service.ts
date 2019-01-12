import { Injectable } from '@angular/core';
import { Contact } from "./contact";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { ApiService } from "../api-service";

@Injectable({
    providedIn: 'root'
})
export class ContactsService extends ApiService {
    // Attributs
    contacts: Observable<Contact[]>;

    // Constructeur
    constructor(http: HttpClient, cookies: CookieService) {
        super(http, cookies);
        this.reloadContacts();
    }

    // Méthodes
    // - contacts
    reloadContacts() {
        this.contacts = this.http.get<Contact[]>(`${ContactsService.API_URL}/sender/contacts/`, { headers: this.httpHeaders });
    }

    creerContact(contact: Contact | {id ?: number, nom: string, email: string}) : Observable<Object> {
        contact.id = 0;

        return this.http.post(`${ContactsService.API_URL}/sender/contacts/`, contact, { headers: this.httpCsrfHeaders });
    }

    creerContactGmail(contact: { email: string }) : Observable<Object> {
        return this.http.get(`${ContactsService.API_URL}/google/oauth/step1/`, {
            headers: this.httpHeaders,
            params: new HttpParams({
                'fromObject': contact,
            }),
        })
    }

    getContact(id: number | string): Observable<Contact> {
        return this.http.get<Contact>(`${ContactsService.API_URL}/sender/contacts/${id}/`, { headers: this.httpHeaders });
    }

    saveContact(contact: Contact): Observable<Object> {
        return this.http.patch(`${ContactsService.API_URL}/sender/contacts/${contact.id}/`, contact, { headers: this.httpCsrfHeaders });
    }

    deleteContact(contact: Contact): Observable<Object> {
        return this.http.delete(`${ContactsService.API_URL}/sender/contacts/${contact.id}/`, { headers: this.httpCsrfHeaders });
    }
}
