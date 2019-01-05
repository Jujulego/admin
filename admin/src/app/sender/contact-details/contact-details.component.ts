import { Component, OnInit } from '@angular/core';
import { Contact } from "../contact";
import { ContactsService } from "../contacts.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
    // Attributs
    contact$: Observable<Contact>;
    formGroup = new FormGroup({
        id: new FormControl(0),
        nom: new FormControl('', [
            Validators.required,
        ]),
        email: new FormControl('', [
            Validators.required, Validators.email,
        ])
    });

    // Constructeur
    constructor(
        private route: ActivatedRoute, private router: Router,
        private service: ContactsService
    ) {}

    // Méthodes
    ngOnInit() {
        // Get contact
        this.contact$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.service.getContact(params.get("id")))
        );

        this.contact$.subscribe((contact: Contact) => {
            this.formGroup.setValue(contact);
        });
    }

    onSubmit() {
        this.service.saveContact(this.formGroup.value)
            .subscribe(() => console.log("Sent !"));
    }

    onDelete() {
        this.service.deleteContact(this.formGroup.value)
            .subscribe(() => {
                console.log("Sent !");
                this.router.navigate(['../'], {relativeTo: this.route});
            });
    }
}
