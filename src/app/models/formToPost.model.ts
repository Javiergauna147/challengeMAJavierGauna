import { Cobertura } from "../interfaces/cobertura-interface";
import { PersonalDataForm } from "../interfaces/personal-data-form-interface";
import { VehiculeDataForm } from "../interfaces/vehicule-data-form-interface";

export class FormToPost {
    userInfo: PersonalDataForm;
    vehiculeInfo: VehiculeDataForm;
    coverageInfo: Cobertura;

    constructor(){}
}