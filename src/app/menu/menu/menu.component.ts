import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  

  ngOnInit(): void {
  }

  constructor(public authService:AuthService, private router:Router) { }

  logout():void{

    this.authService.logout()
    this.router.navigate(['/login'])
    swal.fire('Cerrado de sesion', `has cerrado sesion con Exito!`,'success')  

  }
}
