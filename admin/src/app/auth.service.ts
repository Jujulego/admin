import { Injectable } from '@angular/core';
import { ApiService } from "./api-service";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends ApiService {
    // Attributs
    public isAuthenticated: boolean = false;

    // Constructeur
    constructor(http: HttpClient, cookies: CookieService) {
        super(http, cookies);
        this.reloadState();
    }

    // Méthodes
    private reloadState() {
        this.http
            .get<boolean>(
                `${AuthService.API_URL}/auth/authenticated/`,
                { headers: this.httpHeaders }
            )
            .subscribe(
                state => this.isAuthenticated = state
            );
    }

    login(credentials: {username: string, password: string}): Observable<boolean> {
        return this.http.post<boolean>(
            `${AuthService.API_URL}/auth/login/`, credentials,
            { headers: this.httpCsrfHeaders })
            .pipe(
                map(state => {
                    this.isAuthenticated = state;
                    return state;
                })
            )
    }
}
