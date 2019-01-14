import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
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
    constructor(private auth: AuthService, private router: Router) { }

    // Méthodes
    ngOnInit() {
        if (this.auth.isAuthenticated) {
            this.router.navigate(['',])
        }
    }

    onSubmit() {
        this.auth.login(this.formGroup.value)
            .subscribe(authenticated => {
                if (authenticated) {
                    this.router.navigate(['',])
                } else {
                    this.formGroup.reset()
                }
            })
    }
}
