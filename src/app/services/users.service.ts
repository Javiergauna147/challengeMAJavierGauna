import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

/**
 * TODO: crerar interfaces para los objetos recibidos desde la api y luego modelos para los
 * objetos que se van a usar dentro de la aplicación
*/

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private baseUrl: string = `${ environment.baseUrl }/api_mock_frontend/v1`;

  constructor( private http: HttpClient ) { }

  checkIfUserExists(user: string): Observable<any>{
    return this.http.get(`${ this.baseUrl }/usuarios?nombre=${ user }`);
  }
}