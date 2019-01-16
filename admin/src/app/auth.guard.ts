import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    // Constructeur
    constructor(private auth: AuthService) {}

    // Méthodes
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // Coonnecté ?
        if (this.auth.isAuth) {
            return true;
        }

        // Redirection sur la page de connexion
        this.auth.needAuth(state.url);

        return false;
    }
}
