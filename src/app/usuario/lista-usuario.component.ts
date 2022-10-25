import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../service/usuario.service';
import  swal from 'sweetalert2'

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {

 usuarios: Usuario[]=[];



  constructor(private usuarioService: UsuarioService,
    private toast:ToastrService
    ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void{

this.usuarioService.getUsuarios().subscribe(

  data => {this.usuarios=data;
  }
);



  }


  eliminar(usuario:Usuario): void{


    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: "Esta operacion no se podra revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {


        this.usuarioService.delete(usuario.id).subscribe(

          respose=>this.usuarioService.getUsuarios().subscribe(
    
            response=> {this.usuarios=response

            swalWithBootstrapButtons.fire(
          
              'Eliminado!',
              'El usuario ha sido eliminado',
              'success'
            )}
          )
        )

      } {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El usario sigue activo :)',
          'error'
        )
      }
    })





  }

}
