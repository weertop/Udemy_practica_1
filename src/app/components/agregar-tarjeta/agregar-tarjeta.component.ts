import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ITarjeta, listadoTarjetasTemp } from 'src/app/models/tarjeta.model';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-agregar-tarjeta',
  templateUrl: './agregar-tarjeta.component.html',
  styleUrls: ['./agregar-tarjeta.component.css']
})
export class AgregarTarjetaComponent {

  //tarjetaForm: FormGroup;

  constructor(private form: FormBuilder,
              private toastr: ToastrService,
              private tarjetaService: TarjetaService
  ){}
  
  tarjetaForm: FormGroup = this.form.group({
    nombre: ['',[Validators.required, Validators.maxLength(19)]],
    numero: ['',Validators.required],
    fecha: ['',Validators.required],
    cvv: ['',Validators.required],
  });

  enviar(){
    console.log(this.tarjetaForm.value);
    let nuevaTarjeta = this.obtenerNuevaTarjeta();
    /*this.tarjetaService.postTarjeta(nuevaTarjeta).subscribe({
      next(n) {
          console.log(n);
          this.showSuccess();
      },
      error(err) {
          console.log(err);
      }
    });*/

    this.tarjetaService.postTarjeta(nuevaTarjeta).subscribe(
      response => {
        console.log(response);
        this.showSuccess();
        this.limpiarForm();
      },
      error => {
        console.log(error);
        this.showFailure();
      }
    );
  }

  public isValid(option:string, errorType:string) {
    return (this.tarjetaForm.get(option)?.hasError(errorType) && this.tarjetaForm.get(option)?.touched);
  }

  private obtenerNuevaTarjeta():ITarjeta{
    const nuevaTarjeta:ITarjeta = {
      id: 0,
      nombre: this.tarjetaForm.get('nombre')?.value,
      numero: this.tarjetaForm.get('numero')?.value,
      fechaExpiracion: this.tarjetaForm.get('fecha')?.value,
      cvv: this.tarjetaForm.get('cvv')?.value,
    }

    return nuevaTarjeta;
    //listadoTarjetasTemp.push(nuevaTarjeta);
  }

  private limpiarForm(){
    this.tarjetaForm.reset;
  }

  showSuccess() {
    this.toastr.success('Tarjeta Insertada Correctamente!', 'Tarjeta insertada');
  }

  showFailure() {
    this.toastr.error('Fallo la insercion de la tarjeta!', 'Tarjeta no insertada');
  }
}
