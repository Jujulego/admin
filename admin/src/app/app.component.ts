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

    // Méthodes
    public logout() {
        this.auth.logout().subscribe()
    }

    // Propriétés
    get isAuth(): boolean {
        return this.auth.isAuth;
    }
}
