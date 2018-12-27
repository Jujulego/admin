import { Component } from '@angular/core';
import { Breakpoints } from "./breakpoints.enum";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // Attributs
    title = 'admin';
    Breakpoints = Breakpoints;
}
