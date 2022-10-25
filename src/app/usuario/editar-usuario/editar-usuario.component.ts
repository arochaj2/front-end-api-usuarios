import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import  swal from 'sweetalert2'

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

//id!: number;
usuario:Usuario= new Usuario();

  constructor(

    private usuarioService: UsuarioService,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router

  ) { }

  ngOnInit(): void {

this.getUsuario();

  }

  onUpDate():void{

  this.usuarioService.update(this.usuario).subscribe(


    json=>{
     

      this.router.navigate(['/lista']);
      swal.fire('Editar usuario', `${json.mensaje}: ${json.usuario.nombre}`,'success')
    
    
     }
        ); 

  }




  getUsuario(): void {

    this.activateRoute.params.subscribe(

      params => {

        let id = params['id'];

        if (id) {
          this.usuarioService.buscarUsuario(id).subscribe(
            user => this.usuario = user
          )
        }
      }
    )

    


  }


}
