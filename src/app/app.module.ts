import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaUsuarioComponent } from './usuario/lista-usuario.component';
import { NuevoUsuarioComponent } from './usuario/nuevo-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { MenuComponent } from './menu/menu/menu.component';
import { LoginComponent } from './login/login.component';
import { UsuarioService } from './service/usuario.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';



// external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [
    AppComponent,
    ListaUsuarioComponent,
    NuevoUsuarioComponent,
    EditarUsuarioComponent,
    MenuComponent,LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
  //  FontAwesomeModule

  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
