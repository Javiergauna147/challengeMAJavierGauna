import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/** helpers **/
import { DateHelpers } from '../helpers/date-helpers';

/** Validaciones de formulario**/
import { UsernameUniqueService } from '../validations/username-unique';


@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.css']
})

export class PersonalDataFormComponent {

  curDate = new Date();
  maxDate: string = this.dateHelpers.formatDate(this.dateHelpers.substractYearsFromADate(this.curDate, 18)); // variable para setear el atributo 'max' del input fechaNacimiento
  minDate: string = this.dateHelpers.formatDate(this.dateHelpers.substractYearsFromADate(this.curDate, 99)); // variable para setear el atributo 'min' del input fechaNacimiento
  
  form: FormGroup;
  
  constructor( private formBuilder: FormBuilder,
               private dateHelpers: DateHelpers,
               private userUniqueValidation: UsernameUniqueService ) {

      this.createForm();
    }

  get invalidDni(){
    return this.form.get('dni').invalid && this.form.get('dni').touched;
  }
  
  get invalidApellido(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  get invalidNombre(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get invalidEmail(){
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get invalidCelular(){
    return this.form.get('celular').invalid && this.form.get('celular').touched;
  }

  get invalidTelefono(){
    return this.form.get('telefono').invalid && this.form.get('telefono').touched;
  }

  get invalidUbicacion(){
    return false;
  }

  get invalidFechaNacimiento(){
    return this.form.get('fechaNacimiento').invalid && this.form.get('fechaNacimiento').touched;
  }

  get invalidUsuario(){
    return this.form.get('usuario').invalid && this.form.get('usuario').touched;
  }

  get invalidPassword(){
    return this.form.get('password').invalid && this.form.get('password').touched;
  }
  

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
      usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)], [this.userUniqueValidation.userExits()]],
      // La contraseña debe tener al menos 8 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.
      password: ['', [Validators.required, Validators.pattern('(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S*'), Validators.minLength(8)]]
    })
  }

}
