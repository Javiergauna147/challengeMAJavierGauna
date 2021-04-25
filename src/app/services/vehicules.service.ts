import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class VehiculesService {

  private baseUrl: string = `${ environment.baseUrl }/api/v1`;

  constructor( private http: HttpClient ) { }

  getMarcas(): Observable<any>{
    return this.http.get(`${ this.baseUrl }/vehiculos/marcas`);
  }

  getModelos(code:number, year:number):Observable<any>{
    return this.http.get(`${ this.baseUrl }/vehiculos/marcas/${ code }/${ year }`);
  }

  getVersiones(code:number, year:number, model:string): Observable<any>{
    return this.http.get(`${ this.baseUrl }/vehiculos/marcas/${ code }/${ year }/${ model }`);
  }
}