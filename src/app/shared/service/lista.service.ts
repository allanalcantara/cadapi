import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { lista } from '../model/lista.model';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  apiUrl = 'http://localhost:8080/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public getListaWithFlag(flag: string): Observable<lista>{
    return this.httpClient.get<lista>(this.apiUrl + '' + flag );
  }
}
