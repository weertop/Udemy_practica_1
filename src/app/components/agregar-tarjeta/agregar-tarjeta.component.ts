import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscribable, Subscription } from 'rxjs';
import { ITarjeta, listadoTarjetasTemp } from 'src/app/models/tarjeta.model';
import { ModalService } from 'src/app/services/modal.service';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { TarjetasCompartidoService } from 'src/app/services/tarjetas-compartido.service';

@Component({
  selector: 'app-agregar-tarjeta',
  templateUrl: './agregar-tarjeta.component.html',
  styleUrls: ['./agregar-tarjeta.component.css']
})
export class AgregarTarjetaComponent implements OnInit, OnDestroy {

  tarjetaForm: FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  private isModal: boolean = false;
  idTarjetaActual: number = 0;
  private tarjetaActualSuscription: Subscription = new Subscription;

  constructor(private form: FormBuilder,
              private toastr: ToastrService,
              private tarjetaService: TarjetaService,
              private tarjetaCompartidaService: TarjetasCompartidoService,
              private datePipe: DatePipe,
              protected modalService: ModalService
  ){}
  
  ngOnInit(): void {
    this.tarjetaForm = this.form.group({
      nombre: ['',[Validators.required, Validators.maxLength(19)]],
      numero: ['',Validators.required],
      fecha: ['',Validators.required],
      cvv: ['',Validators.required],
    });

    this.actualizarFormulario();
  }
  
  public isValid(option:string, errorType:string) {
    return (this.tarjetaForm.get(option)?.hasError(errorType) && this.tarjetaForm.get(option)?.touched);
  }

  enviar(): void {
    if(this.isEditMode){
      this.actualizar();
      return;
    }

    console.log(this.tarjetaForm.value);
    let nuevaTarjeta = this.obtenerNuevaTarjeta();

    this.tarjetaService.postTarjeta(nuevaTarjeta).subscribe(
      response => {
        console.log(response);
        this.tarjetaCompartidaService.actualizarListaTarjetas(response);
        this.showSuccess('Tarjeta Insertada Correctamente!');
        this.limpiarForm();
      },
      error => {
        console.log(error);
        this.showFailure('Fallo la insercion de la tarjeta!');
      }
    );
  }

  actualizar(): void {
    let tarjetaActualizada = this.obtenerNuevaTarjeta();
    this.tarjetaService.putTarjeta(tarjetaActualizada.id, tarjetaActualizada).subscribe({
      next: data => {
        console.log(data);
        this.tarjetaCompartidaService.actualizarListaTarjetas(data);
        this.showSuccess('Tarjeta actualizada');
        this.limpiarForm();
        this.isEditMode = false;
        if (this.isModal) {
          this.modalService.close();
          this.isModal = false;
        }
      },
      error: error => {
        console.log(error);
        this.showFailure('Error al actualizar tarjeta');
      }
    });
  }

  actualizarFormulario(): void {
    this.tarjetaActualSuscription = this.tarjetaCompartidaService.tarjetaActual$.subscribe({
      next: tarj => {
        const tarjAct = tarj[0];
        this.isModal = tarj[1];
        this.idTarjetaActual = tarjAct.id;
        const fechaCorrecta = this.formatDate(tarjAct.fechaExpiracion);
        this.tarjetaForm.patchValue({...tarjAct,
          fechaExpiracion: fechaCorrecta
        });
       
        if(tarjAct.id === 0 && tarjAct.nombre === '' && tarjAct.numero === ''){
           this.isEditMode = false;
        }else {
          if (this.isModal) {
            this.modalService.open('modal-1');
          }
          this.isEditMode = true;
        }
      }
    });
  }

  private obtenerNuevaTarjeta():ITarjeta{
    const nuevaTarjeta:ITarjeta = {
      id: this.idTarjetaActual != 0 ? this.idTarjetaActual : 0,
      nombre: this.tarjetaForm.get('nombre')?.value,
      numero: this.tarjetaForm.get('numero')?.value,
      fechaExpiracion: this.tarjetaForm.get('fecha')?.value,
      cvv: this.tarjetaForm.get('cvv')?.value,
    }
    return nuevaTarjeta;
    //listadoTarjetasTemp.push(nuevaTarjeta);
  }

  showSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Operacion Correct');
  }

  showFailure(mensaje: string) {
    this.toastr.error(mensaje, 'Operacion Incorrecta');
  }

  private limpiarForm(){
    this.tarjetaForm.reset();
  }

  private adaptDate(fecha: Date): Date {
    if (!(fecha instanceof Date)){
      fecha = new Date(fecha);
    }
    var fechaCorrecta = fecha.toISOString().split('T')[0];
    return new Date(fechaCorrecta);
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // private transformDate(date: Date): string {
  //   return this.datePipe.transform(date, 'yyyy-MM-dd');
  // }

  ngOnDestroy(): void {
    if (this.tarjetaActualSuscription){
      this.tarjetaActualSuscription.unsubscribe();
    }
  }
}
