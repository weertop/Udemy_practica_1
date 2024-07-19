import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TarjetaCreditoComponent } from './components/tarjeta-credito/tarjeta-credito.component';
import { AgregarTarjetaComponent } from './components/agregar-tarjeta/agregar-tarjeta.component';
import { ListarTarjetasComponent } from './components/listar-tarjetas/listar-tarjetas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TarjetaCreditoComponent,
    AgregarTarjetaComponent,
    ListarTarjetasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
