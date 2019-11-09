import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ParamsService  {

    params : any 
    constructor( ) {

    }
    setParams (p){
        this.params = p
    }
    getParams(){
        return this.params
    }


}
