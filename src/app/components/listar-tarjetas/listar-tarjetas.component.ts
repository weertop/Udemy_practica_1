import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscriber, Subscription } from 'rxjs';
import { ITarjeta, listadoTarjetasTemp } from 'src/app/models/tarjeta.model';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { TarjetasCompartidoService } from 'src/app/services/tarjetas-compartido.service';

@Component({
  selector: 'app-listar-tarjetas',
  templateUrl: './listar-tarjetas.component.html',
  styleUrls: ['./listar-tarjetas.component.css']
})
export class ListarTarjetasComponent implements OnInit, OnDestroy {

  listadoTarjetas: ITarjeta[] = [];
  pipe = new DatePipe('en-US');
  transformedDate: any = null;
  nuevaTarjetaActualizadaSubscription: Subscription = new Subscription;
  isModal: boolean = false;

  constructor(private toastr: ToastrService,
              private tarjetaService: TarjetaService,
              private tarjetasCompartidoService: TarjetasCompartidoService
  ){}

  ngOnInit(): void {
    this.obtenerTarjetas();
    this.actualizarListaInsercion();
    this.transformedDate = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
  }

  obtenerTarjetas():void{
    this.tarjetaService.getTarjetas().subscribe(
      next => {
        console.log(next);
        this.listadoTarjetas = next;
      },
      error => {
        console.log(error);
      }
    );
  }

  actualizarListaInsercion(): void{
    this.nuevaTarjetaActualizadaSubscription = this.tarjetasCompartidoService.nuevaTarjetaActulizada$.subscribe({
      next: data => {
        const index = this.listadoTarjetas.findIndex(t => t.id === data.id);
        if (index != -1){
          this.listadoTarjetas[index] = data;
        }else{
          this.listadoTarjetas.push(data);
        }
      }
    })
  }

  /*eliminarTarjeta(index: number): void{
    this.listadoTarjetas.splice(index,1);
    this.toastr.error('Tarjeta Eliminada Correctamente','Tarjeta Eliminada');
  }*/

  eliminarTarjeta(index: number): void{
    this.tarjetaService.deleteTarjeta(index).subscribe({
      next: response => {
        console.log(response);
        this.obtenerTarjetas();
        this.toastr.error(`${response}`,'Tarjeta Eliminada');
      },
      error: error => {
        console.log(error);
        this.toastr.error('Tarjeta Eliminada Inorrectamente','Fallo al Eliminar');
      }
    });
  }

  modificarTarjetaCargando(tarjetaActual: ITarjeta) {
    this.isModal = false;
    this.tarjetasCompartidoService.tarjetaSeleccionada(tarjetaActual,this.isModal);
  }

  modificarTarjetaModal(tarjetaActual: ITarjeta):void {
    this.isModal = true;
    this.tarjetasCompartidoService.tarjetaSeleccionada(tarjetaActual,this.isModal);
  }

  ngOnDestroy(): void {
    if(this.nuevaTarjetaActualizadaSubscription){
      this.nuevaTarjetaActualizadaSubscription.unsubscribe();
    }
  }
}
