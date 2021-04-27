import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class DateHelpers {
    
    /**
     * formatDate()
     * Formatea una fecha del tipo Date para devolver un sstring con el siguiente formato: 'yyyy-mm-dd'
     * @param date 
     * @returns 
     */
    formatDate(date: Date): string {
        return date.toISOString().substring(0, 10);
    }
    
    /**
     * substractYearsFromADate()
     * Recibe una fecha del tipo Date y le resta la cantidad de anios ingresadas en el atributo years
     * @param date 
     * @param years anios que le vamos a restar a la fecha ingresada
     * @returns 
     */
    substractYearsFromADate(date: Date, years: number): Date{
        date.setFullYear(date.getFullYear() - years);
        return date;
    }

    /**
     * lastYears()
     * Recibe un numero por parametro y retorna los ultimos X años equivalentes al parametro recibido
     * @param yearsToSubstract 
     * @returns 
     */
    lastYears(yearsToSubstract: number): number[] {
        const currentYear = new Date().getFullYear();
        let years: number[] = [];
        for (let i = 0; i <= 20; i++) {
            years.push(currentYear - i);
        }
        return years;
    }

}
