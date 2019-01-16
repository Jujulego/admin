import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from "../navbar.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
    // Attributs
    @Input() brand: string;
    @Input() brandLink: string = "/";

    // Constructeur
    constructor(private service: NavbarService) {}

    // Méthodes
    ngAfterViewInit(): void {
        setTimeout(() => this.service.navbar = this, 0);
    }

    ngOnDestroy(): void {
        setTimeout(() => this.service.navbar = null, 0);
    }

    // Propriétés
    get hasSidebar(): Observable<boolean> {
        return this.service.$hasSidebar;
    }
}
