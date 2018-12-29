import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NavbarItem } from "./navbar-item";
import { Breakpoints } from "../breakpoints.enum";
import { isMenuItem, NavbarMenu } from "./navbar-menu";

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
            new NavbarItem("Item2"),
            new NavbarMenu("Menu2", {}, [
                new NavbarItem("Item3"),
                new NavbarItem("Item4")
            ])
        ])
    ];

    private reduced: boolean = true;
    private collapsed: boolean = true;
    private _sidebarCollapsed: boolean = false;

    // Propriétés
    private get sidebarCollapsed(): boolean {
        return this._sidebarCollapsed;
    }

    private set sidebarCollapsed(val: boolean) {
        this._sidebarCollapsed = val;

        if (val) {
            this.closeMenus();
        }
    }

    // Constructeur
    constructor() { }

    // Méthodes
    ngOnInit() {
        this.onResize();
    }

    @HostListener('window:resize') onResize() {
      this.reduced = window.innerWidth < this.breakpoint;
    }

    closeMenus() {
        this.items
            .filter(isMenuItem)
            .forEach(menu => {
                menu.collapsed = true;
            })
    }
}
