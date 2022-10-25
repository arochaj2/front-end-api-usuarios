import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../service/usuario.service';
import  swal from 'sweetalert2'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  usuario : Usuario= new Usuario();
  // nombre: string='';
  // edad: number=44;
  // email: string='';
  // password: string='1232123';

  constructor(

    private usuarioService: UsuarioService,
    private router: Router,
    private authService : AuthService


  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {




    this.usuarioService.create(this.usuario).subscribe(
    
      usuario=>{

        this.authService.login(this.usuario).subscribe(response => {
          this.authService.guardarUsuario(response.access_token);
          this.authService.guardarToken(response.access_token);
          let usuario = this.authService.usuario;
          
          this.router.navigate(['/lista'])
          swal.fire('Nuevo cliente', `EL usuario ${this.usuario.nombre} ha sido creado con exito`,'success') 
        
        });

      

      }       
      )
    
  }

}


