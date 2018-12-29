import { NavbarItem } from "./navbar-item";
import { NavbarPosition } from "./navbar-utils";

export class NavbarMenu extends NavbarItem {
    // Attributs
    collapsed: boolean = true;

    // Constructeur
    constructor(name: string, options: {position ?: NavbarPosition, always_visible ?: boolean} = {},
                public items: NavbarItem[] = []) {
        super(name, options.position || 'sidebar', options.always_visible)
    }
}
