import { Injectable } from '@angular/core';
import { ValidationErrors, FormGroup} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class SamePasswordValidation {

    samePasswords( pass1Name: string, pass2Name: string ):ValidationErrors {
        return ( FormGroup: FormGroup ) => {
          const pass1Control = FormGroup.controls[pass1Name];
          const pass2Control = FormGroup.controls[pass2Name];
          if(pass1Control.value === pass2Control.value){
            pass2Control.setErrors(null);
          } else {
            pass2Control.setErrors({notSamePassword: true});
          }
        }
      }
}