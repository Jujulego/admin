import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../contacts.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
    // Attributs
    formGroup = new FormGroup({
        nom: new FormControl('', [
            Validators.required,
        ]),
        email: new FormControl('', [
            Validators.required, Validators.email,
        ])
    });

    // Constructeur
    constructor(private service: ContactsService) {}

    // Méthodes
    ngOnInit() {}

    onSubmit() {
        this.service.creerContact(this.formGroup.value)
            .subscribe(() => console.log("Sent !"));
    }
}
