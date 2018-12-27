import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NavbarLayoutComponent } from "./navbar-layout.component";
import { NavbarItemFilterPipe } from "./navbar-item-filter.pipe";
import { MatButtonModule, MatIconModule, MatIconRegistry, MatRippleModule, MatTooltipModule } from "@angular/material";

@NgModule({
    declarations: [
        NavbarLayoutComponent,
        NavbarItemFilterPipe
    ],
    imports: [
        CommonModule,
        MatButtonModule, MatIconModule, MatRippleModule, MatTooltipModule
    ],
    providers: [
        MatIconRegistry
    ],
    exports: [
        NavbarLayoutComponent,
        NavbarItemFilterPipe
    ]
})
export class NavbarModule {
    constructor(iconRegistry: MatIconRegistry) {
        iconRegistry.setDefaultFontSetClass("fas");
    }
}
