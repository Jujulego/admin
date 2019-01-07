import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../contacts.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-gmail-contact-form',
    templateUrl: './gmail-contact-form.component.html',
    styleUrls: ['./gmail-contact-form.component.scss']
})
export class GmailContactFormComponent implements OnInit {
    // Attributs
    formGroup = new FormGroup({
        email: new FormControl('', [
            Validators.required, Validators.email,
        ])
    });

    // Constructeur
    constructor(private service: ContactsService) {}

    // Méthodes
    ngOnInit() {}

    onSubmit() {
        this.service.creerContactGmail(this.formGroup.value)
            .subscribe(obj => this.openPopup(obj["url"]));
    }

    openPopup(url) {
        const newWindow = window.open(url, 'Gmail connection', 'height=600,width=450');

        if (window.focus) {
            newWindow.focus();
        }
    }
}
