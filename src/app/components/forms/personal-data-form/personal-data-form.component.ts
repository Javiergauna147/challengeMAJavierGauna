import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.css']
})
export class PersonalDataFormComponent {

  form: FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.createForm();
  }


  
  get invalidDni(){
    return false;
  }
  
  get invalidApellido(){
    return false;
  }

  get invalidNombre(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get invalidEmail(){
    return false;
  }

  get invalidCelular(){
    return false;
  }

  get invalidTelefono(){
    return false;
  }

  get invalidUbicacion(){
    return false;
  }

  get invalidFechaNacimiento(){
    return false;
  }

  get invalidUsuario(){
    return false;
  }

  get invalidPassword(){
    return false;
  }
  

  createForm(){
    this.form = this.formBuilder.group({
      dni: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      ubicacion: this.formBuilder.group({
        provincia: ['', [Validators.required]],
        ciudad: ['', [Validators.required]],
        domicilio: ['', [Validators.required]]
      }),
      fechaNacimiento: ['', [Validators.required]],
      Usuario: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

}
