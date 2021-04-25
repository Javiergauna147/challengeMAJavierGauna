import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AltaAseguradoComponent } from "./pages/alta-asegurado/alta-asegurado.component";

const routes: Routes = [
  { path: 'alta-asegurado', component: AltaAseguradoComponent },
  { path: '**', redirectTo: '/alta-asegurado' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
