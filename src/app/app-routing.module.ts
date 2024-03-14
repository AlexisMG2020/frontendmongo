import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { Error404Component } from './components/error404/error404.component';

const routes: Routes = [
  {path:'',component:ListarProductosComponent},
  {path:'crear-producto',component:CrearProductoComponent},
  {path: 'editar-producto/:id', component:CrearProductoComponent},
  {path:'**',component:Error404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
