import { Component } from '@angular/core';

/** Modelos **/
import { FormToPost } from '../../models/formToPost.model';

@Component({
  selector: 'app-alta-asegurado',
  templateUrl: './alta-asegurado.component.html',
  styleUrls: ['./alta-asegurado.component.css']
})
export class AltaAseguradoComponent {

  /** Instancia del objeto que se enviará al backend **/
  formToPost: FormToPost = new FormToPost();
  /** la pagina se inicia mostrando el formularo de la información personal del usuario **/
  currentForm: string = 'personal-data-form';
  /** Variable para controlar que el formulario este listo para enviarse al back **/
  readyToPost: boolean = false;

  constructor() { }

  receiveDataFromPersonalData($event){
    this.currentForm = 'vehicule-data-form';
    this.formToPost.userInfo = $event;
  }
  receiveDataFromVehiculeData($event){
    this.currentForm = 'coverage-data-form';
    this.formToPost.vehiculeInfo = $event;
  }
  receiveDataFromCoverageData($event){
    this.readyToPost = true;
    this.formToPost.coverageInfo = $event
  }

  /**
   * metodo para cambiar los componentes de formularios que se muestran
   */
  backForm(){
    if(this.currentForm === 'coverage-data-form'){
      this.currentForm = 'vehicule-data-form';
    }else{
      this.currentForm = 'personal-data-form';
    }
    this.readyToPost = false;
  }

  postForm(){
    console.log(this.formToPost);
    alert(this.formToPost);
  }
}