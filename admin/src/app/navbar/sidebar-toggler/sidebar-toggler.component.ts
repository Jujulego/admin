import { Component } from '@angular/core';
import { NavbarService } from "../navbar.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-sidebar-toggler',
    templateUrl: './sidebar-toggler.component.html',
    styleUrls: ['./sidebar-toggler.component.scss']
})
export class SidebarTogglerComponent {
    // Constructeur
    constructor(private service: NavbarService) {}

    // Méthodes
    onClick() {
        this.service.$reduceSidebar.next(
            !this.service.$reduceSidebar.value
        )
    }

    // Propriétés
    get $reduce(): Observable<boolean> {
        return this.service.$reduceSidebar;
    }
}
