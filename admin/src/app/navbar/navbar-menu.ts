import { NavbarItem, NavbarItemOptions } from "./navbar-item";

function isNavbarItemArray(val: NavbarItemOptions | NavbarItem[]): val is NavbarItem[] {
    return (<NavbarItem[]> val).length !== undefined;
}

export class NavbarMenu extends NavbarItem {
    // Attributs
    public items: NavbarItem[] = [];
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
    constructor(name: string, icon: string, arg1: NavbarItemOptions | NavbarItem[], arg2?: NavbarItem[]) {
        super(name, icon, '', (isNavbarItemArray(arg1) ? { position: 'sidebar' } : arg1 as NavbarItemOptions));

        // Options
        this.items = isNavbarItemArray(arg1) ? arg1 as NavbarItem[] : arg2 || [];
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