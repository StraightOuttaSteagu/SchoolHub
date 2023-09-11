import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../../app.config";
import {Observable} from "rxjs";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  authorities: string[];
  imageUrl: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getCurrentUser(): Observable<User> {
    return this.http.get(`${AppConfig.API_ENDPOINT}/account`) as Observable<User>;
  }
}
