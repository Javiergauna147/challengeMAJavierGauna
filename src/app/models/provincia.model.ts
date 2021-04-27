export class ProvinciaModel {

    private provincias: [];

    constructor(provincias: []){
        this.provincias = provincias;
    }

    /** Getters **/
    
    getProvincias() {
        return this.provincias;
    }
}