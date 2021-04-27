# Mercantil Andina Challenge Javier Gauna

Este es un proyecto realizado en Angular 10, el cual valida un formulario por etapas
y luego simula el envio del mismo a un api.

Para desplegar el proyecto en modo de Desarrollo

- Abrir una terminal en la ubicación del proyecto
- Ejecutar `npm install` para instalar librerias
- Ejecutar `npm start`

## Descripción

El proyecto consiste en una componente Padre (`AltaAseguradoComponent`) que funciona como página y en su interior contiene tres componentes hijos

- `PersonalDataFormComponent` componente que contiene el formulario para la información del usuario
- `VehiculeDataFormComponent` componente que contiene el formulario para la información del vehículo
- `CoveragesComponent` componente que contiene la selección de cobertura

Todos los componentes tienen sus respectivas validaciones de formulario y se comunican al componente padre mediante Outputs, para que este
recopile los datos y luego simule enviarlos a la api. El componente puede ir ocultando y mostrando los distintos formularios cambiando el
atributo css `display`, se utiliza eso y no un `*ngIf` ya que esto nos destruiría el componente y al querer regresar a un formulario completado,
perderíamos los datos y tendríamos que reescribirlos al querer corregir un campo.