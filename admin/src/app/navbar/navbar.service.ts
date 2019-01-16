import { Injectable } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NavbarService {
    // Attributs
    public $hasNavbar  = new BehaviorSubject<boolean>(false);
    public $hasSidebar = new BehaviorSubject<boolean>(false);

    private _navbar  ?: NavbarComponent  = null;
    private _sidebar ?: SidebarComponent = null;

    // Méthodes
    constructor() {}

    // Propriétés
    get navbar() : NavbarComponent {
        return this._navbar
    }

    set navbar(val : NavbarComponent) {
        this._navbar = val;
        this.$hasNavbar.next(val !== null)
    }

    get sidebar() : SidebarComponent {
        return this._sidebar
    }

    set sidebar(val : SidebarComponent) {
        this._sidebar = val;
        this.$hasSidebar.next(val !== null)
    }
}
