import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../components/components.module";

import { AltaAseguradoComponent } from './alta-asegurado/alta-asegurado.component';



@NgModule({
  declarations: [AltaAseguradoComponent],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class PagesModule { }
