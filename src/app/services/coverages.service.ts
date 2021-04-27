import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Cobertura } from "../interfaces/cobertura-interface";

@Injectable({
  providedIn: 'root'
})
export class CoveragesService {

  private baseUrl: string = `${ environment.baseUrl }/api_mock_frontend/v1`;

  constructor( private http: HttpClient ) { }

  getCoberturas(): Observable<Cobertura[]>{
    return this.http.get<Cobertura[]>(`${ this.baseUrl }/coberturas`);
  }
}
