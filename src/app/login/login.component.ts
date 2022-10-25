import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Titulo:string='Por favor iniciar sesion';
  usuario:Usuario;

  constructor(private authService: AuthService, private router:Router ) {

    this.usuario= new Usuario();
    
    
    
   }



  ngOnInit(): void {

    // if(this.authService.isAuthenticated){
    //   swal.fire('Login', `Hola ${this.authService.usuario.nombre} ya estas autenticado`,'info')
    //   this.router.navigate(['/']);
    // }
    
  }

  login():void{

    //console.log(this.usuario)
    if(this.usuario.email==null || this.usuario.password==null){

      swal.fire('Error Login', `username o password vacias`,'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response=>{
      console.log(response);

     this.authService.guardarUsuario(response.access_token);
     this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario
      this.router.navigate(['/lista'])
      swal.fire('Inicio de sesion', `Hola ${usuario.email} has iniciado sesion con Exito!`,'success')  

    }, err=>{

      if(err.status==400){
        swal.fire('Error Login', `Usuario o clave incorrecta`,'error');
      }
    })



    
  }







}
