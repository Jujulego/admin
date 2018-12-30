import { Component } from '@angular/core';
import { Breakpoints } from "./breakpoints.enum";
import { NavbarItem } from "./navbar/navbar-item";
import { NavbarMenu } from "./navbar/navbar-menu";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // Attributs
    public navbarItems = [
        new NavbarItem("Accueil", "fa-home", "/", { link_exact: true }),
        new NavbarMenu("Erreur", "fa-exclamation", [
            new NavbarItem("Not Found !", "fa-exclamation-circle", "/not-found"),
        ]),
    ];

    public Breakpoints = Breakpoints;
}
