import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { UsersService } from '../../../services/users.service';


@Injectable({
    providedIn: 'root'
})
export class UsernameUniqueService {

    constructor( private usersService: UsersService ) { }
    
    /**
     * userExits()
     * Chequea si el nombre de usuario del formulario existe en la base de datos
     * @returns 
     */
    userExits(): AsyncValidatorFn {
        return( control: AbstractControl ): Observable<ValidationErrors> => {
            return this.usersService.checkIfUserExists(control.value).pipe(map(res => {
                return res ? { usernameExits: true } : null;
            }));
        }
    }
}