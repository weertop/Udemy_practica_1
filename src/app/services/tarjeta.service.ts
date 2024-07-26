import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITarjeta } from '../models/tarjeta.model';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private baseURL: string = environment.apiUrl;
  private apiURL: string = "/api/TarjetaCredito/";

  constructor(private httpClient: HttpClient) { }

  public getTarjetas():Observable<ITarjeta[]>{
    return this.httpClient.get<ITarjeta[]>(`${this.baseURL}${this.apiURL}`);
  }

  public getTarjeta(id: number):Observable<ITarjeta>{
    return this.httpClient.get<ITarjeta>(`${this.baseURL}${this.apiURL}${id}`);
  }

  public postTarjeta(tarjeta:ITarjeta):Observable<ITarjeta>{
    return this.httpClient.post<ITarjeta>(`${this.baseURL}${this.apiURL}`,tarjeta);
  }

  public putTarjeta(id:number, tarjeta:ITarjeta):Observable<ITarjeta>{
    return this.httpClient.put<ITarjeta>(`${this.baseURL}${this.apiURL}${id}`,tarjeta);
  }

  public deleteTarjeta(id:number):Observable<string>{
    return this.httpClient.delete<{message: string}>(`${this.baseURL}${this.apiURL}${id}`)
            .pipe(
              map(response => response.message)
            );
  }

}
