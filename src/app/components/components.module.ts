import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";



import { NavbarComponent } from './navbar/navbar.component';
import { PersonalDataFormComponent } from './forms/personal-data-form/personal-data-form.component';



@NgModule({
  declarations: [NavbarComponent, PersonalDataFormComponent],
  exports: [
    NavbarComponent,
    PersonalDataFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
