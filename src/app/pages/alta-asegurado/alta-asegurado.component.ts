import { Component } from '@angular/core';

@Component({
  selector: 'app-alta-asegurado',
  templateUrl: './alta-asegurado.component.html',
  styleUrls: ['./alta-asegurado.component.css']
})
export class AltaAseguradoComponent {

  constructor() { }

  receiveDataFromPersonalData($event){
    console.log('Hola desde el componente padre');
    console.log($event);
  }
}
