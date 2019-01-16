import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { ActivatedRoute, Router } from "@angular/router";
import { attrBoolValue } from "../../utils";

@Component({
    selector: 'app-sidebar-link',
    templateUrl: './sidebar-link.component.html',
    styleUrls: ['./sidebar-link.component.scss']
})
export class SidebarLinkComponent {
    // Attributs
    @Input() text: string;
    @Input() icon: string | IconDefinition;
    @Input() link: string;
    @Input() linkExact: boolean;
    @Input() realLink:  boolean;

    @Output() click = new EventEmitter<void>();

    // Constructeur
    constructor(private route: ActivatedRoute, private router: Router) {}

    // Méthodes
    public onClick() {
        if (this.link === undefined) {
            // Send click event
            this.click.emit()
        } else {
            // Has a link so navigate to it
            if (attrBoolValue(this.realLink)) {
                // real link
                window.location.href = this.link;
            } else {
                // router link
                this.router.navigate([this.link,]);
            }
        }
    }

    // Propriétés
    public get isActive(): boolean {
        return this.router.isActive(this.link, attrBoolValue(this.linkExact));
    }
}
