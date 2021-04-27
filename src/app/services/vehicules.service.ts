import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

/** Interfaces **/
import { Marca } from "../interfaces/marca-interface";
import { Version } from '../interfaces/version-interface';

@Injectable({
  providedIn: 'root'
})

export class VehiculesService {

  private baseUrl: string = `${ environment.baseUrl }/api/v1`;

  constructor( private http: HttpClient ) { }

  getMarcas(): Observable<Marca[]>{
    return this.http.get<Marca[]>(`${ this.baseUrl }/vehiculos/marcas`);
  }

  getModelos(code:number, year:number):Observable<string[]>{
    return this.http.get<string[]>(`${ this.baseUrl }/vehiculos/marcas/${ code }/${ year }`);
  }

  getVersiones(code:number, year:number, model:string): Observable<Version[]>{
    return this.http.get<Version[]>(`${ this.baseUrl }/vehiculos/marcas/${ code }/${ year }/${ model }`);
  }
}