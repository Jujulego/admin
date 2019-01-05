import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NavbarLayoutComponent } from "./navbar-layout.component";
import { NavbarItemFilterPipe } from "./navbar-item-filter.pipe";
import { MatButtonModule, MatIconModule, MatIconRegistry, MatRippleModule, MatTooltipModule } from "@angular/material";
import { NavbarItemIsMenuPipe } from './navbar-item-is-menu.pipe';
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        NavbarLayoutComponent,
        NavbarItemFilterPipe,
        NavbarItemIsMenuPipe
    ],
    imports: [
        CommonModule, RouterModule,
        MatButtonModule, MatIconModule, MatRippleModule, MatTooltipModule
    ],
    providers: [
        MatIconRegistry
    ],
    exports: [
        NavbarLayoutComponent,
        NavbarItemFilterPipe,
        NavbarItemIsMenuPipe
    ]
})
export class NavbarModule {
    constructor(iconRegistry: MatIconRegistry) {
        iconRegistry.setDefaultFontSetClass("fas");
    }
}
