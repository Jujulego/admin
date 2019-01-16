import { Injectable } from '@angular/core';
import { ApiService } from "./api-service";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable, Observer, of } from "rxjs";
import { first, map } from "rxjs/operators";
import { Behavior } from "popper.js";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends ApiService {
    // Attributs
    private _redirectUrl: string = "";

    public $isAuth = new BehaviorSubject<boolean>(false);

    // Constructeur
    constructor(private router: Router, http: HttpClient, cookies: CookieService) {
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

    public login(credentials: {username: string, password: string}): Observable<boolean> {
        return this.http
            .post<boolean>(
                `${AuthService.API_URL}/auth/login/`, credentials,
                { headers: this.httpCsrfHeaders }
            ).pipe(
                map(state => {
                    this.$isAuth.next(state);

                    // If connected, automatically redirects to previously requested page
                    if (state) this.redirectToPrevious();

                    return state;
                })
            )
    }

    public logout(): Observable<any> {
        return this.http
            .get(
                `${AuthService.API_URL}/auth/logout/`,
                { headers: this.httpHeaders }
            ).pipe(
                map(state => {
                    // Disconnection
                    this.$isAuth.next(false);
                    this.needAuth("");

                    return state;
                })
            )
    }

    public needAuth(url: string): Promise<boolean> {
        this._redirectUrl = url;
        return this.router.navigate(["/login"]);
    }

    public redirectToPrevious() : Promise<boolean> {
        return this.router.navigateByUrl(this._redirectUrl);
    }

    // Propriétés
    public get isAuth(): boolean {
        return this.$isAuth.getValue()
    }
}
