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
        new NavbarItem("Administration", "fa-cogs", "/admin/", { link_href: true }),
    ];

    public Breakpoints = Breakpoints;
}
