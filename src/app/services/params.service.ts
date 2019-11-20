import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ParamsService  {

    carrinhoCliente: Array<any>
    params : any 
    usuario: Array<any>
    constructor( ) {

    }

    setUser(u) {
        this.usuario = u
    }

    getUser() {
        return this.usuario
    }

    setParams (p){
        this.params = p
    }
    getParams(){
        return this.params
    }

    setCarrinhoCliente(carrinhoCliente) {
        this.carrinhoCliente = carrinhoCliente
    }

    getCarrinhoCliente() {
        return this.carrinhoCliente
    }


}
