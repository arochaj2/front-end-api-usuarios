import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { ListaUsuarioComponent } from './usuario/lista-usuario.component';
import { NuevoUsuarioComponent } from './usuario/nuevo-usuario.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './usuario/guards/auth.guard';
import { RoleGuard } from './usuario/guards/role.guard';

const routes: Routes = [

  {path: 'lista', component: ListaUsuarioComponent, canActivate:[AuthGuard],data:{role:'ROLE_ADMIN'}},
  {path: 'nuevo',component: NuevoUsuarioComponent},
  {path: 'editar/:id', component: EditarUsuarioComponent, canActivate:[AuthGuard],data:{role:'ROLE_ADMIN'}},
  {path: 'login',component:LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
