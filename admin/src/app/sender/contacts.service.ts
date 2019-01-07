import { Injectable } from '@angular/core';
import { Contact } from "./contact";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    // Attributs
    contacts: Observable<Contact[]>;

    private httpHeaders = new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' });

    // Constructeur
    constructor(private http: HttpClient, private cookies: CookieService) {
        this.reloadContacts();
    }

    // Méthodes
    get httpCsrfHeaders() : HttpHeaders {
        return this.httpHeaders
            .append('X-CSRFToken', this.cookies.get('csrftoken'));
    }

    // - contacts
    reloadContacts() {
        this.contacts = this.http.get<Contact[]>(`${API_URL}/sender/contacts/`, { headers: this.httpHeaders });
    }

    creerContact(contact: Contact | {id ?: number, nom: string, email: string}) : Observable<Object> {
        contact.id = 0;

        return this.http.post(`${API_URL}/sender/contacts/`, contact, { headers: this.httpCsrfHeaders });
    }

    creerContactGmail(contact: { email: string }) : Observable<Object> {
        return this.http.get(`${API_URL}/google/oauth/step1/`, {
            headers: this.httpHeaders,
            params: new HttpParams({
                'fromObject': contact,
            }),
        })
    }

    getContact(id: number | string): Observable<Contact> {
        return this.http.get<Contact>(`${API_URL}/sender/contacts/${id}/`, { headers: this.httpHeaders });
    }

    saveContact(contact: Contact): Observable<Object> {
        return this.http.patch(`${API_URL}/sender/contacts/${contact.id}/`, contact, { headers: this.httpCsrfHeaders });
    }

    deleteContact(contact: Contact): Observable<Object> {
        return this.http.delete(`${API_URL}/sender/contacts/${contact.id}/`, { headers: this.httpCsrfHeaders });
    }
}
