import {Component, Input, OnInit} from '@angular/core';
import { NavbarItem } from "./navbar-item";

@Component({
    selector: 'app-navbar-layout',
    templateUrl: './navbar-layout.component.html',
    styleUrls: ['./navbar-layout.component.scss']
})
export class NavbarLayoutComponent implements OnInit {
    // Attributs
    @Input() brand: string;
    @Input() items: NavbarItem[] = [
        new NavbarItem("Test1"),
        new NavbarItem("Test2", 'top'),
        new NavbarItem("Test3", 'top', true),
    ];

    // Constructeur
    constructor() { }

    // Méthodes
    ngOnInit() { }
}
