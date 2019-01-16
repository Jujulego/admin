import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    // Attributs
    formGroup = new FormGroup({
        username: new FormControl('', [
            Validators.required,
        ]),
        password: new FormControl('', [
            Validators.required,
        ])
    });

    // Constructeur
    constructor(private auth: AuthService) { }

    // Méthodes
    ngOnInit() {
        this.auth.$isAuth.subscribe(isauth => {
            if (isauth) this.auth.redirectToPrevious()
        });
    }

    onSubmit() {
        this.auth.login(this.formGroup.value)
            .subscribe(state => {
                if (!state) this.formGroup.reset()
            })
    }
}
