import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ITarjeta, listadoTarjetasTemp } from 'src/app/models/tarjeta.model';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjetas',
  templateUrl: './listar-tarjetas.component.html',
  styleUrls: ['./listar-tarjetas.component.css']
})
export class ListarTarjetasComponent implements OnInit {

  listadoTarjetas: ITarjeta[] = [];
  pipe = new DatePipe('en-US');
  transformedDate: any = null;

  constructor(private toastr: ToastrService,
              private tarjetaService: TarjetaService
  ){}

  ngOnInit(): void {
    this.obtenerTarjetas();
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

  /*eliminarTarjeta(index: number): void{
    this.listadoTarjetas.splice(index,1);
    this.toastr.error('Tarjeta Eliminada Correctamente','Tarjeta Eliminada');
  }*/

  eliminarTarjeta(index: number): void{
    this.tarjetaService.deleteTarjeta(index).subscribe(
      data => {
        console.log(data);
        this.obtenerTarjetas();
        this.toastr.error(`${data}`,'Tarjeta Eliminada');
      },
      error => {
        console.log(error);
        this.toastr.error('Tarjeta Eliminada Inorrectamente','Fallo al Eliminar');
      }
    );
  }

  modificarTarjetaCargando(index: number): void{
    this.tarjetaService.deleteTarjeta(index).subscribe(
      data => {
        console.log(data);
        this.toastr.error(`${data}`,'Tarjeta Eliminada');
      },
      error => {
        console.log(error);
        this.toastr.error('Tarjeta Eliminada Inorrectamente','Fallo al Eliminar');
      }
    );
  }

  modificarTarjetaModal():void {

  }
}
