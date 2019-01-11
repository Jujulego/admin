import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    // Constructeur
    constructor(private auth: AuthService, private router: Router) {}

    // Méthodes
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.isAuthenticated.pipe(
            map(isAuthenticated => {
                if (!isAuthenticated) {
                    this.router.navigate(['/login',])
                }

                return isAuthenticated
            })
        );
    }
}
