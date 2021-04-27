/**
 * interfaz para manipular la información recibida del formularo personal-data-form
 */
export interface PersonalDataForm {
    apellido: string,
    celular: string,
    dni: string,
    email: string,
    fechaNacimiento: string,
    nombre: string,
    password1: string,
    password2: string,
    telefono: string,
    ubicacion: Ubicacion,
    usuario: string
}

interface Ubicacion {
    provincia: string,
    ciudad: string,
    domicilio: string
}