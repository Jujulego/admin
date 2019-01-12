import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from "./index/index.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },

    { path: '', canActivate: [AuthGuard],
        children: [
            { path: '', component: IndexComponent, pathMatch: 'full' },
        ]
    },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes, { enableTracing: true }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
