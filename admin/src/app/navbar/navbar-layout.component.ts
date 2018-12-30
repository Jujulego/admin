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
    @Input() brandLink: string;
    @Input() breakpoint: Breakpoints = Breakpoints.LG;
    @Input() items: NavbarItem[] = [];

    private reduced: boolean = true;
    private collapsed: boolean = true;
    private _sidebarCollapsed: boolean = false;

    // Propriétés
    get sidebarCollapsed(): boolean {
        return this._sidebarCollapsed;
    }

    set sidebarCollapsed(val: boolean) {
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
