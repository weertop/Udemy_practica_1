import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITarjeta } from '../models/tarjeta.model';

@Injectable({
  providedIn: 'root'
})
export class TarjetasCompartidoService {

  private nuevaTarjetaSubject = new BehaviorSubject<ITarjeta>({} as ITarjeta);       //creamos un objeto subject al que podamos darle un valor inicial, crear un observalbe y suscribirnos
  nuevaTarjetaActulizada$ = this.nuevaTarjetaSubject.asObservable();              //creamos un observable

  private tarjetaSeleccionadaSubject = new BehaviorSubject<any>([{
    id: 0,
    nombre: '',
    numero: '',
    fechaExpiracion: new Date,
    cvv: 0
  },false]);
  tarjetaActual$ = this.tarjetaSeleccionadaSubject.asObservable();

  constructor() { }

  actualizarListaTarjetas(newItem: ITarjeta){
    this.nuevaTarjetaSubject.next(newItem);
  }

  tarjetaSeleccionada(selectedItem: ITarjeta, isModal: boolean){
    this.tarjetaSeleccionadaSubject.next([selectedItem,isModal]);
  }
}
