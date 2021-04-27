import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { Observable } from "rxjs";
import { map } from 'rxjs/operators';


interface ProvinciasResponse {
  cantidad: number,
  inicio: number,
  parametros: {},
  provincias: Provincia[],
  total: number
}

interface Provincia {
  id: string,
  nombre: string
}

interface MunicipiosResponse {
  cantidad: number,
  inicio: number,
  parametros: {},
  municipios: Municipio[],
  total: number
}

interface Municipio {
  id: string,
  nombre: string
}



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