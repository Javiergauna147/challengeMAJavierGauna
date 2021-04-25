import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GeographicService {

  basUrlGeoRefAr: string = 'https://apis.datos.gob.ar/georef/api';

  constructor( private http: HttpClient ) { }

  getProvincias(): Observable<any>{
    return this.http.get(`${ this.basUrlGeoRefAr }/provincias`);
  }

  getMunicipios( idProvincia: string ): Observable<any>{
    return this.http.get(`${ this.basUrlGeoRefAr }/municipios?provincia=${ idProvincia }&campos=id,nombre&max=135`);
  }
}