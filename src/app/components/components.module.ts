import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";


/** Components **/
import { NavbarComponent } from './navbar/navbar.component';
import { PersonalDataFormComponent } from './forms/personal-data-form/personal-data-form.component';
import { VehiculeDataFormComponent } from './forms/vehicule-data-form/vehicule-data-form.component';
import { CoveragesComponent } from './coverages/coverages.component';

/** Pipes **/
import { CleanTextPipe } from "../pipes/clean-text.pipe";



@NgModule({
  declarations: [NavbarComponent, PersonalDataFormComponent, VehiculeDataFormComponent, CoveragesComponent, CleanTextPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule
    
  ],
  exports: [
    NavbarComponent,
    PersonalDataFormComponent,
    VehiculeDataFormComponent,
    CoveragesComponent
  ]
})
export class ComponentsModule { }
