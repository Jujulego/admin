import { Pipe, PipeTransform } from '@angular/core';
import { NavbarItem } from "./navbar-item";
import { NavbarMultiplePosition, isPosArray } from "./navbar-utils";

@Pipe({
    name: 'navitemfilter'
})
export class NavbarItemFilterPipe implements PipeTransform {
    // Méthodes
    transform(items: NavbarItem[], positions: NavbarMultiplePosition, always_visible?: boolean): NavbarItem[] {
        return items.filter(
            item => {
                if (always_visible !== undefined && item.always_visible != always_visible) {
                    return false;
                }

                if (isPosArray(positions)) {
                    return positions.indexOf(item.position) !== -1;
                } else {
                    return positions !== item.position;
                }
            }
        );
    }
}