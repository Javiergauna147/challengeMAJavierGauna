import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { FormToPost } from '../models/formToPost.model';

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

  /**
   * checkIfUserExists()
   * Envia un usario a la api para ver si existe
   * @param user 
   * @returns 
   */
  checkIfUserExists(user: string): Observable<boolean>{
    return this.http.get<boolean>(`${ this.baseUrl }/usuarios?nombre=${ user }`);
  }

  /**
   * postUser()
   * simula el envio de información a la api
   * @param formToPost 
   */
  postUser(formToPost: FormToPost): Promise<boolean>{
    return new Promise( (resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
  }
}