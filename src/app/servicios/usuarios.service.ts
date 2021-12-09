import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl :string= "http://127.0.0.1:8000/";
  constructor(
    private http: HttpClient
  ) { }

  headers = {
    'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
  }

  getUsuarios() {
    return this.http.get(this.baseUrl+'mostrarUsuarios/',{'headers':this.headers,withCredentials:true})
  }

  getGenerarToken(usuario) {
    return this.http.get(this.baseUrl+'generarToken/?cliente='+usuario,{'headers':this.headers,withCredentials:true})
  }

  getUsarToken(usuario,token) {

    return this.http.get(this.baseUrl+'usarToken/?cliente='+usuario+'&token='+token,{'headers':this.headers,withCredentials:true})
  }
}
