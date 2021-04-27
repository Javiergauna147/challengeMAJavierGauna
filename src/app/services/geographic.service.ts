import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

/** Interfaces **/
import { MunicipiosResponse } from "../interfaces/municipiosResponse-interface";
import { ProvinciasResponse } from "../interfaces/provinciasResponse-interface";

@Injectable({
  providedIn: 'root'
})
export class GeographicService {

  constructor( private http: HttpClient ) { }

  getProvincias(): Observable<ProvinciasResponse>{
    return this.http.get<ProvinciasResponse>(`${ environment.baseUrlGeoRefAr }/provincias?campos=id,nombre`);
  }

  getMunicipios( idProvincia: string ): Observable<MunicipiosResponse>{
    return this.http.get<MunicipiosResponse>(`${ environment.baseUrlGeoRefAr }/municipios?provincia=${ idProvincia }&campos=id,nombre&max=135`);
  }
}