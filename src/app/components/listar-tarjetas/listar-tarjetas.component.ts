import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ITarjeta, listadoTarjetasTemp } from 'src/app/models/tarjeta.model';

@Component({
  selector: 'app-listar-tarjetas',
  templateUrl: './listar-tarjetas.component.html',
  styleUrls: ['./listar-tarjetas.component.css']
})
export class ListarTarjetasComponent implements OnInit {

  listadoTarjetas: ITarjeta[] = [];
  pipe = new DatePipe('en-US');
  transformedDate: any = null;

  constructor(private toastr: ToastrService){}

  ngOnInit(): void {
    this.listadoTarjetas = listadoTarjetasTemp;
    this.transformedDate = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
  }

  eliminarTarjeta(index: number): void{
    this.listadoTarjetas.splice(index,1);
    this.toastr.error('Tarjeta Eliminada Correctamente','Tarjeta Eliminada');
  }
}
