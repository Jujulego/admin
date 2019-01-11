import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../environments/environment";

export abstract class ApiService {
    // Statiques
    static API_URL = environment.apiUrl;

    // Attributs
    protected httpHeaders = new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' });

    // Constructeurs
    protected constructor(protected http: HttpClient, protected cookies: CookieService) { }

    // Méthodes
    protected get httpCsrfHeaders() : HttpHeaders {
        return this.httpHeaders
            .append('X-CSRFToken', this.cookies.get('csrftoken'));
    }
}
