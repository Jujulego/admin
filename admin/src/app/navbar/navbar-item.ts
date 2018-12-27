import { NavbarPosition } from './navbar-utils';

export class NavbarItem {
    // Constructeur
    constructor(public name: string,
        public position: NavbarPosition = "sidebar",
        public always_visible: boolean = false) {}
}
