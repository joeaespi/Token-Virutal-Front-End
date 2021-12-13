import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './inicio/inicio.component';
import {ClienteComponent} from './cliente/cliente.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio',pathMatch:'full' },
  { path: 'inicio',component:InicioComponent,} ,
  { path: "cliente/:id", component: ClienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
