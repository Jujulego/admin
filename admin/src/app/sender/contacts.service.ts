import { Injectable } from '@angular/core';
import { Contact } from "./contact";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    // Attributs
    contacts: Observable<Contact[]>;
    private httpOptions = {
        headers: new HttpHeaders({
            'X-Requested-With': 'XMLHttpRequest',
        }),
    };

    // Constructeur
    constructor(private http: HttpClient, private cookies: CookieService) {
        this.reloadContacts();
    }

    // Méthodes
    private getCsrfOptions() {
        return {
            headers: new HttpHeaders({
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': this.cookies.get('csrftoken')
            }),
        };
    }

    // - contacts
    reloadContacts() {
        this.contacts = this.http.get<Contact[]>(`${API_URL}/sender/contacts/`, this.httpOptions);
    }

    creerContact(contact: Contact | {id ?: number, nom: string, email: string}) : Observable<Object> {
        contact.id = 0;

        return this.http.post(`${API_URL}/sender/contacts/`, contact, this.getCsrfOptions());
    }

    getContact(id: number | string): Observable<Contact> {
        return this.http.get<Contact>(`${API_URL}/sender/contacts/${id}/`, this.httpOptions);
    }

    saveContact(contact: Contact): Observable<Object> {
        return this.http.patch(`${API_URL}/sender/contacts/${contact.id}/`, contact, this.getCsrfOptions());
    }

    deleteContact(contact: Contact): Observable<Object> {
        return this.http.delete(`${API_URL}/sender/contacts/${contact.id}/`, this.getCsrfOptions());
    }
}
