import { Component } from '@angular/core';
import { Breakpoints } from "./breakpoints.enum";
import { NavbarItem } from "./navbar/navbar-item";
import { NavbarMenu } from "./navbar/navbar-menu";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // Attributs
    public navbarItems = [
        new NavbarItem("Accueil", "fa-home", "/", { link_exact: true }),
        new NavbarMenu("Sender", "fa-paper-plane", [
            new NavbarItem("Contacts", "fa-users", "/contacts"),
        ]),
        new NavbarItem("Administration", "fa-cogs", "/admin/", { link_href: true }),
    ];

    public Breakpoints = Breakpoints;

    // Constructeur
    constructor(private auth: AuthService) {}

    // Propriétés
    get isAuthenticated(): Observable<boolean> {
        return this.auth.isAuthenticated
    }
}
