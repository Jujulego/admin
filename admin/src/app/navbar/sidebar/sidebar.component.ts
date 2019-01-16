import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NavbarService } from "../navbar.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
    // Constructeur
    constructor(private service: NavbarService) {}

    // Méthodes
    ngAfterViewInit(): void {
        setTimeout(() => this.service.sidebar = this, 0);
    }

    ngOnDestroy(): void {
        setTimeout(() => this.service.sidebar = null, 0);
    }
}
