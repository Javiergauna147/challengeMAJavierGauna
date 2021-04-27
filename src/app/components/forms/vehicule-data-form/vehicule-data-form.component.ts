import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Marca } from 'src/app/interfaces/marca-interface';

/** Servicios **/
import { VehiculesService } from '../../../services/vehicules.service';
import { Version } from '../../../interfaces/version-interface';

/** Helpers **/
import { DateHelpers } from '../helpers/date-helpers';


@Component({
  selector: 'app-vehicule-data-form',
  templateUrl: './vehicule-data-form.component.html',
  styleUrls: ['./vehicule-data-form.component.css']
})
export class VehiculeDataFormComponent {
  
  marcas: Marca[] = [];
  modelos: string[] = [];
  versiones: Version[] = [];
  anios: number[] = this.dateHelpers.lastYears(20);
  
  /**
   * Variables creadas para ir guardando los valores que se han seleccionado, son necesarias para realizar algunas peticiones a la api
   */
  marcaSelected: Marca; 
  anioSelected: number;

  constructor( private formBuilder: FormBuilder,
               private vehiculesService: VehiculesService,
               private dateHelpers: DateHelpers ) {

      this.createForm();
      //Desactivamos todos los campos para ir los activando a medida que pedimos los datos
      this.form.get('marca').disable();
      this.form.get('anio').disable();
      this.form.get('modelo').disable();
      this.form.get('version').disable();

      this.cargarMarcas()

  }

  form: FormGroup;


  cargarMarcas() {
    this.vehiculesService.getMarcas().subscribe(data => {
      if( data.length > 0 ){
        this.marcas = data;
        this.form.get('marca').enable();
      }else{
        this.emitAlert();
      }
    })
  }

  setMarca(marcaNombre: string) {

    this.form.get('modelo').disable();
    this.form.get('version').disable();
    this.modelos = [];
    this.versiones = [];

    this.marcaSelected = this.marcas.find(marca => marca.desc === marcaNombre);
    this.form.get('anio').enable();
  }

  cargarModelos(anio: number) {
    
    this.form.get('version').disable();
    this.versiones = [];

    this.anioSelected = anio;

    this.vehiculesService.getModelos(this.marcaSelected.codigo, this.anioSelected).subscribe(data => {
      if(data.length != 0){
        this.modelos = data;
        this.form.get('modelo').enable();
      }else{
        this.emitAlert();
      }
    })
  }

  cargarVersiones(modelo: string) {

    this.vehiculesService.getVersiones(this.marcaSelected.codigo, this.anioSelected, modelo).subscribe(data => {
      if(data.length > 0){
        this.versiones = data;
        this.form.get('version').enable();
      }else{
        alert('no hay versiones para este vehiculo');
      }
    })
  }

  emitAlert(){
    // En caso de no poder recibir la informacion de la api, enviamos la siguiente alerta
    alert('Lo sentimos, estamos teniendo inconvenientes por favor intentelo más tarde');
  }

  saveForm() {
    console.log(this.form.value);
  }
  
  createForm(){
    this.form = this.formBuilder.group({
      marca: ['', [Validators.required]],
      anio: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      version: ['', []]
    })
  }

}
