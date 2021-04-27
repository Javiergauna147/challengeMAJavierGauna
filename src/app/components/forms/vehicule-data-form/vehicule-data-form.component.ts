import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Marca } from 'src/app/interfaces/marca-interface';

/** Servicios **/
import { VehiculesService } from '../../../services/vehicules.service';
import { Version } from '../../../interfaces/version-interface';

/** Helpers **/
import { DateHelpers } from '../helpers/date-helpers';
import { VehiculeDataForm } from 'src/app/interfaces/vehicule-data-form-interface';

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
  
  form: FormGroup;

  @Output() nextEvent = new EventEmitter<VehiculeDataForm>()

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

  /** Validacion para el campo marca, utilizada en el html **/
  get invalidMarca(){
    return this.form.get('marca').invalid && this.form.get('marca').touched;
  }
  /** Validacion para el campo marca, utilizada en el html **/
  get invalidAnio(){
    return this.form.get('anio').invalid && this.form.get('anio').touched;
  }
  /** Validacion para el modelo marca, utilizada en el html **/
  get invalidModelo(){
    return this.form.get('modelo').invalid && this.form.get('modelo').touched;
  }
  /** Validacion para el modelo marca, utilizada en el html **/
  get invalidVersion(){
    return this.form.get('version').invalid && this.form.get('version').touched;
  }

  /**
   * cargarMarcas()
   * método para cargar las marcas de vehiculos desde la api
   */
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
  /**
   * setMarca()
   * método para guardar dentro de una variable marcaSelected del componente el vehiculo que se este eligiendo
   * la variable marcaSelected se utiliza para poder enviar la información de la marca en el método cargarModelos()
   * @param marcaNombre nombre del a marca
   */
  setMarca(marcaNombre: string) {
    this.form.get('modelo').disable();
    this.form.get('version').disable();
    this.modelos = [];
    this.versiones = [];

    this.marcaSelected = this.marcas.find(marca => marca.desc === marcaNombre);
    this.form.get('anio').enable();
  }
  
  /**
   * cargarModelos()
   * método para cargar las modelos desde la api
   * @param anio año del vehiculo
   */
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
  /**
   * cargarVersiones()
   * método para cargar las versiones desde la api
   * @param modelo modelo del vehiculo
   */
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

  /**
   * saveForm()
   * método que se ejecuta al enviar el formulario
   */
  saveForm() {
    // Si algún campo quedó vacio, se marcan los errores antes de permitir enviar el formulario
    if ( this.form.invalid ){
      return Object.values(this.form.controls).forEach( control => {
        control.markAllAsTouched();
      });
    }
    const formCompleted: VehiculeDataForm = this.form.value;
    // Enviamos los datos al componente padre
    this.nextEvent.emit(formCompleted);
  }
  /**
   * createForm()
   * método para crear el formulario, ejecutado en el constructor
   */
  createForm(){
    this.form = this.formBuilder.group({
      marca: ['', [Validators.required]],
      anio: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      version: ['', []]
    })
  }
}
