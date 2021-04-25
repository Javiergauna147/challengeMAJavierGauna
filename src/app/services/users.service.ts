import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

/**
 * TODO: crerar interfaces para los objetos recibidos desde la api y luego modelos para los
 * objetos que se van a usar dentro de la aplicación
*/
interface Usuario {
  nombre: string,
  apellido: string
}

@Injectable({
  providedIn: 'root'
})

export class usersService {

  //todo cambiar esta variable por una de entorno
  private baseUrl: string = `${ environment.baseUrl }/api_mock_frontend/v1'`;

  constructor( private http: HttpClient ) { }

  checkIfUserExists(user: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${ this.baseUrl }/usuarios?nombre=${ user }`);
  }
}