import { Component } from '@angular/core';

/** Servicios **/
import { CoveragesService } from '../../../services/coverages.service';

/** interfaces **/
import { Cobertura } from '../../../interfaces/cobertura-interface';

@Component({
  selector: 'app-coverages',
  templateUrl: './coverages.component.html',
  styleUrls: ['./coverages.component.css']
})
export class CoveragesComponent {

  coverages: Cobertura[] = [];

  coverageSelected: Cobertura;

  showSelectedCoverage: boolean = false; // variable a modo de bandera para espeficicar que ya hay una cobertura seleccionada

  constructor( private coveragesService: CoveragesService ) {
    this.cargarCoberturas();
  }

  cargarCoberturas() {
    this.coveragesService.getCoberturas().subscribe(data => {
      if(data.length > 0){
        this.coverages = data;
        this.coverages = this.sortCoberturas(this.coverages); // una vez que tenemos los datos, los ordenamos
      }else{
        alert('ocurrio un error al buscar coberturas');
      }
    })
  }
  
  /**
   * sortCoberturas()
   * Ordena un array de Coberturas, tomando como valor para ordenar el atributo puntaje
   * @param arrayOfCoverages 
   * @returns
   */
  sortCoberturas( arrayOfCoverages: Cobertura[] ): Cobertura[] {
    arrayOfCoverages.sort((a, b) => {
      if (a.puntaje > b.puntaje) return  -1;
      if (a.puntaje < b.puntaje) return 1;
      return 0;
    })
    return arrayOfCoverages;
  }
  
  /**
   * saveCoverage()
   * metodo que envia los datos de la cobertura elegida al componte padre
   * @param coverage 
   */
  saveCoverage(coverage: Cobertura) {
    this.coverageSelected = coverage;
    this.showSelectedCoverage = true;
  }

}