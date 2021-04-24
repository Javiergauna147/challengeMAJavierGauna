import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiMAService {

  private baseUrl: string = 'https://servicios.qamercantilandina.com.ar/api/v1'

  constructor( private http: HttpClient ) { }

  getMarcas(){
    return this.http.get(`${ this.baseUrl }/vehiculos/marcas`);
  }

  getModelos(code:number, year:number){
    return this.http.get(`${ this.baseUrl }/vehiculos/marcas/${ code }/${ year }`);
  }

  getVersiones(code:number, year:number, model:string){
    return this.http.get(`${ this.baseUrl }/vehiculos/marcas/${ code }/${ year }/${ model }`);
  }
}