import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-navbar-layout',
    templateUrl: './navbar-layout.component.html',
    styleUrls: ['./navbar-layout.component.scss']
})
export class NavbarLayoutComponent implements OnInit {
    // Attributs
    @Input() brand: string;

    // Constructeur
    constructor() { }

    // Méthodes
    ngOnInit() { }
}
