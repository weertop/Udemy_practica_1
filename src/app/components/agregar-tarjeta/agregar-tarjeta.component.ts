import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ITarjeta, listadoTarjetasTemp } from 'src/app/models/tarjeta.model';

@Component({
  selector: 'app-agregar-tarjeta',
  templateUrl: './agregar-tarjeta.component.html',
  styleUrls: ['./agregar-tarjeta.component.css']
})
export class AgregarTarjetaComponent {

  //tarjetaForm: FormGroup;

  constructor(private form: FormBuilder,
              private toastr: ToastrService
  ){}
  
  tarjetaForm: FormGroup = this.form.group({
    nombre: ['',[Validators.required, Validators.maxLength(19)]],
    numero: ['',Validators.required],
    fecha: ['',Validators.required],
    cvv: ['',Validators.required],
  });

  enviar(){
    console.log(this.tarjetaForm.value);
    this.agregarALista();
    this.showSuccess();
    this.limpiarForm();
  }

  public isValid(option:string, errorType:string) {
    return (this.tarjetaForm.get(option)?.hasError(errorType) && this.tarjetaForm.get(option)?.touched);
  }

  private agregarALista(){
    const nuevaTarjeta:ITarjeta = {
      nombre: this.tarjetaForm.get('nombre')?.value,
      numero: this.tarjetaForm.get('numero')?.value,
      fechaExpiracion: this.tarjetaForm.get('fecha')?.value,
      cvv: this.tarjetaForm.get('cvv')?.value,
    }

    listadoTarjetasTemp.push(nuevaTarjeta);
  }

  private limpiarForm(){
    this.tarjetaForm.reset;
  }

  showSuccess() {
    this.toastr.success('Tarjeta Insertada Correctamente!', 'Tarjeta insertada');
  }
}
