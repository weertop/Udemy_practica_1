import { getLocaleDateFormat } from "@angular/common"

export interface ITarjeta{
    id: number,
    nombre: string,
    numero: string,
    fechaExpiracion: Date,
    cvv: number
}

var newDate: Date = new Date(2024,0,1);

export var listadoTarjetasTemp:ITarjeta[] = [
    {id: 1, nombre: 'Pedro Xanche', numero: '1234 1234 1234 1234', fechaExpiracion: newDate, cvv: 123 },
    {id: 2, nombre: 'Juan Illo', numero: '4321 4321 4321 4321', fechaExpiracion: newDate, cvv: 321 },
]