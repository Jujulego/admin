import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

@Component({
    selector: 'app-sidebar-item',
    templateUrl: './sidebar-item.component.html',
    styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent {
    // Attributs
    @Input() text: string;
    @Input() icon: string | IconDefinition;
    @Input() link: string;
    @Input() linkExact: boolean;

    // Constructeur
    constructor() { }
}
