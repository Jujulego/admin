import { Component } from '@angular/core';
import { NavbarService } from "../navbar.service";

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
}
