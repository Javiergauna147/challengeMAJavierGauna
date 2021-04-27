import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

/** Interfaces **/
import { MunicipiosResponse } from "../interfaces/municipiosResponse-interface";
import { ProvinciasResponse } from "../interfaces/provinciasResponse-interface";

@Injectable({
  providedIn: 'root'
})
export class GeographicService {

  basUrlGeoRefAr: string = 'https://apis.datos.gob.ar/georef/api';

  constructor( private http: HttpClient ) { }

  getProvincias(): Observable<ProvinciasResponse>{
    return this.http.get<ProvinciasResponse>(`${ this.basUrlGeoRefAr }/provincias?campos=id,nombre`);
  }

  getMunicipios( idProvincia: string ): Observable<MunicipiosResponse>{
    return this.http.get<MunicipiosResponse>(`${ this.basUrlGeoRefAr }/municipios?provincia=${ idProvincia }&campos=id,nombre&max=135`);
  }
}