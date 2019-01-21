import { Injectable } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BehaviorSubject } from "rxjs";
import { BreakpointObserver } from "@angular/cdk/layout";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class NavbarService {
    // Attributs
    public $hasNavbar   = new BehaviorSubject<boolean>(false);
    public $hasSidebar  = new BehaviorSubject<boolean>(false);
    public $smallScreen = new BehaviorSubject<boolean>(false);

    public $showToggler   = new BehaviorSubject<boolean>(false);
    public $reduceSidebar = new BehaviorSubject<boolean>(false);

    private _navbar  ?: NavbarComponent  = null;
    private _sidebar ?: SidebarComponent = null;

    // Méthodes
    constructor(breakpointObserver: BreakpointObserver) {
        // Toggler
        this.$hasSidebar.subscribe(value => this.$showToggler.next(value && this.$smallScreen.getValue()));
        this.$smallScreen.subscribe(value => this.$showToggler.next(value && this.$hasSidebar.getValue()));

        // Observe breakpoint
        breakpointObserver.observe("(max-width: 1200px)")
            .pipe(map(result => result.matches))
            .subscribe(this.$smallScreen);
    }

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
