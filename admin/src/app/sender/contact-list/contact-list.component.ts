import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../contacts.service";

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
    // Attributs
    displayedColumns: string[] = ['nom', 'email'];

    // Constructeur
    constructor(private service: ContactsService) { }

    // Méthodes
    ngOnInit() {}

    onReload() {
        this.service.reloadContacts();
    }

    // Propriétés
    get contacts$() {
        return this.service.contacts;
    }
}

