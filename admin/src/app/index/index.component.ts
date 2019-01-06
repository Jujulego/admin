import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

const API_URL = environment.apiUrl;

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    // Constructeur
    constructor(private http: HttpClient) {}

    // Méthodes
    ngOnInit() {}

    onSubmit(form: NgForm) {
        this.requestAuthUrl(form.value).subscribe(
            obj => {
                window.location.href = obj["url"]
            }
        )
    }

    private requestAuthUrl(params: {email: string}): Observable<Object> {
        return this.http.get(`${API_URL}/google/oauth/step1/`, {
            headers: new HttpHeaders({
                'X-Requested-With': 'XMLHttpRequest',
            }),
            params: new HttpParams({
                'fromObject': params,
            }),
        })
    }
}
