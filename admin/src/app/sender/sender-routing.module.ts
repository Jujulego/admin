import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from "./contact-list/contact-list.component";
import { ContactDetailsComponent } from "./contact-details/contact-details.component";

const routes: Routes = [
    { path: 'contacts', children: [
        { path: '',    component: ContactListComponent },
        { path: ':id', component: ContactDetailsComponent },
    ]},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class SenderRoutingModule {}
