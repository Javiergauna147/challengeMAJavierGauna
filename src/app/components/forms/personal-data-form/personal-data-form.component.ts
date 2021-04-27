import { Component, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/** Servicios **/
import { GeographicService } from '../../../services/geographic.service';
/** helpers **/
import { DateHelpers } from '../helpers/date-helpers';
/** Validaciones de formulario**/
import { UsernameUniqueValidation } from '../validations/username-unique';
import { SamePasswordValidation } from '../validations/same-password';
import { PersonalDataForm } from '../../../interfaces/personal-data-form-interface';


@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.css']
})

export class PersonalDataFormComponent {

  curDate = new Date();
  maxDate: string = this.dateHelpers.formatDate(this.dateHelpers.substractYearsFromADate(this.curDate, 18)); // variable para setear el atributo 'max' del input fechaNacimiento
  minDate: string = this.dateHelpers.formatDate(this.dateHelpers.substractYearsFromADate(this.curDate, 99)); // variable para setear el atributo 'min' del input fechaNacimiento

  provincias = [];
  ciudades = [];
  
  form: FormGroup;

  @Output() nextEvent = new EventEmitter<PersonalDataForm>()
  
  constructor( private formBuilder: FormBuilder,
               private dateHelpers: DateHelpers,
               private userUniqueValidation: UsernameUniqueValidation,
               private samePsswordValidation: SamePasswordValidation,
               private geoService: GeographicService ) {

      this.createForm();
      this.cargarProvincias();

      //Desactivamos todos los campos para ir los activando a medida que pedimos los datos
      this.form.controls.ubicacion.get('provincia').disable();
      this.form.controls.ubicacion.get('ciudad').disable();
      this.form.controls.ubicacion.get('domicilio').disable();
  }

  /** Validacion para el campo dni, utilizada en el html **/
  get invalidDni(){
    return this.form.get('dni').invalid && this.form.get('dni').touched;
  }
  /** Validacion para el campo apellido, utilizada en el html **/
  get invalidApellido(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }
  /** Validacion para el campo nombre, utilizada en el html **/
  get invalidNombre(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }
  /** Validacion para el campo email, utilizada en el html **/
  get invalidEmail(){
    return this.form.get('email').invalid && this.form.get('email').touched;
  }
  /** Validacion para el campo celular, utilizada en el html **/
  get invalidCelular(){
    return this.form.get('celular').invalid && this.form.get('celular').touched;
  }
  /** Validacion para el campo telefono, utilizada en el html **/
  get invalidTelefono(){
    return this.form.get('telefono').invalid && this.form.get('telefono').touched;
  }
  /** Validacion para el campo fechaNacimiento, utilizada en el html **/
  get invalidFechaNacimiento(){
    return this.form.get('fechaNacimiento').invalid && this.form.get('fechaNacimiento').touched;
  }
  /** Validacion para el campo usuario, utilizada en el html **/
  get invalidUsuario(){
    return this.form.get('usuario').invalid && this.form.get('usuario').touched;
  }
  /** Validacion para el campo password1, utilizada en el html **/
  get invalidPassword1(){
    return this.form.get('password1').invalid && this.form.get('password1').touched;
  }

  get invalidPassword2() {

    const pass1 = this.form.get('password1').value;
    const pass2 = this.form.get('password2').value;

    return (pass1 === pass2) ? false : true;
  }
  
  /**
   * cargarProvincias()
   * método para cargar las provincias desde api
   * Se ejecuta en el constructor para que mientras el usuario complete los primeros campos
   * del formulario ya se tenga esta información lista
   */
  cargarProvincias(){
    this.geoService.getProvincias().subscribe(data => {
      if(data.provincias.length > 0){
        this.provincias = data.provincias;
        this.form.controls.ubicacion.get('provincia').enable();
      }else{
        // En caso de no poder recibir los datos geográficos de la api emitimos la siguiente alerta
        alert('Lo sentimos, estamos teniendo inconvenientes por favor intentelo más tarde');
      }
    })
  }
  
  /**
   * cargarCiudades()
   * método para cargar las ciudades desde la api
   * @param provinciaNombre nombre de la provincia a la cual se le buscarán sus ciudades
   */
  cargarCiudades(provinciaNombre){

    const provincia = this.provincias.find(provincia => provincia.nombre === provinciaNombre);
    this.ciudades = [];
    this.geoService.getMunicipios(provincia.id).subscribe(data => {
      if(data.municipios.length > 0){
        this.ciudades = data.municipios;
        this.form.controls.ubicacion.get('ciudad').enable();
        this.form.controls.ubicacion.get('domicilio').enable();
      }
    })
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
    const formCompleted: PersonalDataForm = this.form.value;
    // Enviamos los datos al componente padre
    this.nextEvent.emit(formCompleted);
  }
  
  /**
   * createForm()
   * método para crear el formulario, ejecutado en el constructor
   */
  createForm(){
    this.form = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern('([0-9])*'),Validators.minLength(7), Validators.maxLength(8)]],
      apellido: ['',  [Validators.required, Validators.pattern('[a-zA-Z ]*'),Validators.minLength(2), Validators.maxLength(15)]],
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'),Validators.minLength(2), Validators.maxLength(15)]],
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      /**
       * Validacion Celular:
       * -Toma como opcionales:
       *   -Prefijo internacional (54)
       *   -Prefijo internacional para celulares (9)
       *   -Prefijo de acceso a interurbanas (0)
       *   -Prefijo local para celulares (15)
       * -Es obligatorio:
       *   -código de área (11, 2xx, 2xxx, 3xx, 3xxx, 6xx y 8xx)
       * (no toma como válido el número local sin código de área como 4444-0000)
      */
      celular: ['', [Validators.pattern('(?:(?:00)?549?)?0?(?:11|[2368]\\d)(?:(?=\\d{0,2}15)\\d{2})??\\d{8}$')]],
      telefono: ['', [Validators.pattern('([0-9])*')]],
      ubicacion: this.formBuilder.group({
        provincia: ['', [Validators.required]],
        ciudad: ['', [Validators.required]],
        domicilio: ['', [Validators.required]]
      }),
      fechaNacimiento: ['', [Validators.required]],
      usuario: ['', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
        asyncValidators: [this.userUniqueValidation.userExits()],
        updateOn: 'blur' // actualizamos el campo cuando lo deseleccionamos, para no estar consultando la api de usarios por cada letra que se escriba
      }],
      // La contraseña debe tener al menos 8 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.
      password1: ['', [Validators.required, Validators.pattern('(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S*'), Validators.minLength(8)]],
      password2: ['', [Validators.required]]
    },{
      validators: this.samePsswordValidation.samePasswords('password1', 'password2')
    })
  }
}