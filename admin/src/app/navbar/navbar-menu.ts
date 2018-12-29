import { NavbarItem } from "./navbar-item";
import { NavbarPosition } from "./navbar-utils";

export class NavbarMenu extends NavbarItem {
    // Attributs
    private _collapsed: boolean = true;

    // Propriétés
    get collapsed(): boolean {
        return this._collapsed;
    }

    set collapsed(val: boolean) {
        this._collapsed = val;

        if (!val) {
            this.closeSubMenu();
        }
    }

    // Constructeur
    constructor(name: string, options: {position ?: NavbarPosition, always_visible ?: boolean} = {},
                public items: NavbarItem[] = []) {
        super(name, options.position || 'sidebar', options.always_visible)
    }

    // Méthodes
    closeSubMenu() {
        this.items
            .filter(isMenuItem)
            .forEach(menu => {
                menu.collapsed = true;
            });
    }
}

export function isMenuItem(item: NavbarItem): item is NavbarMenu {
    return item instanceof NavbarMenu
}