import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = 'http://localhost:8080/api/'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os Usuarios
  getUsuarios(): Observable<Usuarios[]> {
    return this.httpClient.get<Usuarios[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um usuario pelo id
  getUsuariosById(codigo: number): Observable<Usuarios> {
    return this.httpClient.get<Usuarios>(this.url + '/' + codigo)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva 
  savecodigo(usuarios: Usuarios): Observable<Usuarios> {
    return this.httpClient.post<Usuarios>(this.url, JSON.stringify(usuarios), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um carro
  updatecodigo(usuarios: Usuarios): Observable<Usuarios> {
    return this.httpClient.put<Usuarios>(this.url + '/' + usuarios.codigo, JSON.stringify(usuarios), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta 
  deleteUsuarios(usuarios: Usuarios) {
    return this.httpClient.delete<Usuarios>(this.url + '/' + usuarios.codigo, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}