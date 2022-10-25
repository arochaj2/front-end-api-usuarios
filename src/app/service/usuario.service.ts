import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';

import { Router } from '@angular/router';
import {map, catchError} from 'rxjs/operators';
import  swal from 'sweetalert2'
import { AuthService } from './auth.service';



@Injectable(
  )

export class UsuarioService {

private urlEndPoint:string ='http://localhost:8080/usuario/';

private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});





  constructor(private httpClient: HttpClient, private router:Router,
    private authService:AuthService) { }


private agregarAuthorizationHeader(){

  let token = this.authService.token;

  if(token !=null){
    return this.httpHeader.append('Authorization','Bearer'+token)
  }

  return this.httpHeader;
}

public getUsuarios(): Observable <Usuario[]>{

  return this.httpClient.get(this.urlEndPoint+'lista',{headers:this.agregarAuthorizationHeader()}).pipe(

    map(response => response as Usuario[]),

    catchError(e=>{
      
      if(this.isNoAutorizado(e)){
        return throwError(e);
      }
      return throwError(e);
    })
    
    
    )
    
}

public buscarUsuario(id: number): Observable <Usuario>{


  return this.httpClient.get<Usuario>(this.urlEndPoint+ `detail/${id}`,{headers:this.agregarAuthorizationHeader()}).pipe(
    catchError(e=>{

      if(this.isNoAutorizado(e)){
        return throwError(e);
      }

      this.router.navigate(['/']);
      //console.error(e.error.mensaje);
      swal.fire('Error al editar',e.error.mensaje,'error');
      return throwError(e);
    })
  )
  
 }


public create (usuario: Usuario): Observable<Usuario> {



  return this.httpClient.post<Usuario>(this.urlEndPoint+'create', usuario,{headers:this.agregarAuthorizationHeader()}).pipe(
    map((response: any) => response.cliente as Usuario),


    catchError(e=>{

      if(this.isNoAutorizado(e)){
        return throwError(e);
      }
      //console.error(e.error.mensaje);
      swal.fire(e.error.mensaje,e.error.mensaje,'error');
      return throwError(e);
    })
  );

}

public update (usuario: Usuario): Observable<any> {


  return this.httpClient.put<any>(this.urlEndPoint+`update/${usuario.id}`, usuario,
  {headers:this.agregarAuthorizationHeader()}).pipe(
    catchError(e=>{

      if(this.isNoAutorizado(e)){
        return throwError(e);
      }
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje,e.error.mensaje,'error');
      return throwError(e);
    })
  );
}


public delete (id: number): Observable<Usuario> {

return this.httpClient.delete<Usuario> (this.urlEndPoint+ `delete/${id}`,
{headers:this.agregarAuthorizationHeader()})

}


// Codigo error HTTP 401 (No Atorizado: carece de credenciales validas de autenticacion)
// Codigo error HTTP  403 (Prohibido o acceso denegado)

private isNoAutorizado(e:any):boolean{

  if(e.status==401){
    swal.fire('Acceso denegado',`Debe registrarse para acceder a este recurso`,'warning');

    if(this.authService.isAuthenticated){
      this.authService.logout();
    }

    this.router.navigate([('login')]);
    return true;
  }

  if(e.status==403){

    swal.fire('Acceso denegado',`Hola ${this.authService.usuario.nombre} no tienes acceso a este recurso`,'warning');
    this.router.navigate([('login')]);
    return true;
  }

  return false;
}



}
