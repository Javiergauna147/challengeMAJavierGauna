import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe personalizada para limpiar los textos con la "ñ" dañada que vienen desde el back ejemplo:
 * input: "Da±os"
 * output: "Daños"
 */

@Pipe({
  name: 'cleanText'
})
export class CleanTextPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('±', 'ñ');
  }
}
