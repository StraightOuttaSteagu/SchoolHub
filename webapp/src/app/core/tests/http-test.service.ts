import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../baseURL';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpTestService {
    constructor (private _http: HttpClient) { }

    get(link: string, payload: any): Observable<any> {
        return this._http.get(`${baseURL}${link}`, payload);
    }

    post(link: string, payload: any): Observable<any> {
        return this._http.post(`${baseURL}${link}`, payload);
    }
}