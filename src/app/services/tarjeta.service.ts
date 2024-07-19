import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITarjeta } from '../models/tarjeta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private appURL: string = "http://localhost:5271/";
  private apiURL: string = "api/TarjetaCredito/";

  constructor(private httpClient: HttpClient) { }

  public getTarjetas():Observable<ITarjeta[]>{
    return this.httpClient.get<ITarjeta[]>(`${this.appURL}${this.apiURL}`);
  }

  public getTarjeta(id: number):Observable<ITarjeta>{
    return this.httpClient.get<ITarjeta>(`${this.appURL}${this.apiURL}${id}`);
  }

  public postTarjeta(tarjeta:ITarjeta):Observable<ITarjeta>{
    return this.httpClient.post<ITarjeta>(`${this.appURL}${this.apiURL}`,tarjeta);
  }

  public putTarjeta(id:number, tarjeta:ITarjeta):Observable<ITarjeta>{
    return this.httpClient.put<ITarjeta>(`${this.appURL}${this.apiURL}${id}`,tarjeta);
  }

  public deleteTarjeta(id:number):Observable<string>{
    return this.httpClient.delete<string>(`${this.appURL}${this.apiURL}${id}`);
  }

}
