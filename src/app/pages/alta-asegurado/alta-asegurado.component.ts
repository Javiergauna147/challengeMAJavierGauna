import { Component } from '@angular/core';
/** Servicios **/
import { UsersService } from '../../services/users.service';
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

  loading: boolean = false;

  constructor( private usersService: UsersService ) { }

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
   * backForm()
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
  /**
   * postForm()
   * metodo para simular el envio de información a la api
   */
  postForm(){
    this.loading = true;
    this.usersService.postUser(this.formToPost).then(data => {
      if(data){
        this.loading = false;
        alert("Datos enviados: (También estan impresos en consola)\n" + JSON.stringify(this.formToPost))
        console.log(this.formToPost);
      };
    })
  }
}