import { Injectable } from '@angular/core';
import { ApiService } from "./api-service";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable, Observer, of } from "rxjs";
import { first, map } from "rxjs/operators";
import { Behavior } from "popper.js";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends ApiService {
    // Attributs
    public $isAuth = new BehaviorSubject<boolean>(false);

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
            ).subscribe(this.$isAuth);
    }

    login(credentials: {username: string, password: string}): Observable<boolean> {
        return this.http
            .post<boolean>(
                `${AuthService.API_URL}/auth/login/`, credentials,
                { headers: this.httpCsrfHeaders })
            .pipe(
                map(state => {
                    this.$isAuth.next(state);
                    return state;
                })
            )
    }

    // Propriétés
    public get isAuth(): boolean {
        return this.$isAuth.getValue()
    }
}
