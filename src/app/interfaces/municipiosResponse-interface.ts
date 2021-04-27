import { Municipio } from "./municipio-interface";

export interface MunicipiosResponse {
    cantidad: number,
    inicio: number,
    parametros: {},
    municipios: Municipio[],
    total: number
}