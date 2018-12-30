import { NavbarPosition } from './navbar-utils';

export declare type NavbarItemOptions = {
    position ?: NavbarPosition,
    always_visible ?: boolean,
    link_exact ?: boolean
};

export class NavbarItem {
    // Attributs
    public position: NavbarPosition = 'sidebar';
    public always_visible: boolean = false;
    public link_options = {};

    // Constructeur
    constructor(public name: string, public icon: string, public link: string, options: NavbarItemOptions = {}) {
        // Options !
        this.position = options.position || 'sidebar';
        this.always_visible = options.always_visible || false;
        if (options.link_exact || false) {
            this.link_options = { exact: true };
        }

        // Item sur la sidebar ne peux pas être tjs visible
        if (this.position === 'sidebar') {
            this.always_visible = false;
        }
    }
}