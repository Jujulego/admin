import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatButtonModule, MatRippleModule, MatTooltipModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarLayoutComponent } from "./navbar-layout/navbar-layout.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarTogglerComponent } from './sidebar-toggler/sidebar-toggler.component';
import { NavbarService } from "./navbar.service";
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { NavbarContentComponent } from './navbar-content/navbar-content.component';

@NgModule({
    declarations: [
        NavbarLayoutComponent, NavbarContentComponent,
        NavbarComponent, SidebarComponent, SidebarItemComponent, SidebarTogglerComponent,
    ],
    imports: [
        CommonModule, RouterModule,
        FontAwesomeModule,
        MatButtonModule, MatRippleModule, MatTooltipModule
    ],
    providers: [
        NavbarService,
    ],
    exports: [
        NavbarLayoutComponent, NavbarContentComponent,
        NavbarComponent, SidebarComponent, SidebarItemComponent,
    ]
})
export class NavbarModule {}
