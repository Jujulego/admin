import { Component } from '@angular/core';
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // Constructeur
    constructor(private auth: AuthService) {}

    // Propriétés
    get isAuthenticated(): boolean {
        return this.auth.isAuth;
    }
}
