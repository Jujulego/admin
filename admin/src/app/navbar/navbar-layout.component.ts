import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NavbarItem } from "./navbar-item";
import { Breakpoints } from "../breakpoints.enum";
import { NavbarMenu } from "./navbar-menu";

@Component({
    selector: 'app-navbar-layout',
    templateUrl: './navbar-layout.component.html',
    styleUrls: ['./navbar-layout.component.scss']
})
export class NavbarLayoutComponent implements OnInit {
    // Attributs
    @Input() brand: string;
    @Input() breakpoint: Breakpoints = Breakpoints.LG;
    @Input() items: NavbarItem[] = [
        new NavbarItem("Test1"),
        new NavbarItem("Sidebar !!!"),
        new NavbarItem("Test2", 'top'),
        new NavbarItem("Test3", 'top', true),
        new NavbarMenu("Menu", {}, [
            new NavbarItem("Item1"),
            new NavbarItem("Item1")
        ])
    ];

    private reduced: boolean = true;
    private collapsed: boolean = true;
    private sidebarCollapsed: boolean = false;

    // Constructeur
    constructor() { }

    // Méthodes
    ngOnInit() {
        this.onResize();
    }

    @HostListener('window:resize') onResize() {
      this.reduced = window.innerWidth < this.breakpoint;
    }
}
