import { Provincia } from "./provincia-interface";

export interface ProvinciasResponse {
    cantidad: number,
    inicio: number,
    parametros: {},
    provincias: Provincia[],
    total: number
}