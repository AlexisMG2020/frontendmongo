import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/productos';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent {

  listProductos : Producto[] = [];


  constructor(
    private _productoService:ProductoService,
    private toastr:ToastrService
  ){}
  
  ngOnInit():void{
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data =>{
      console.log(data);  
      this.listProductos = data;    
    },error =>{
      console.log(error);      
    });
  }

  eliminarProducto(id:any){
    this._productoService.eliminarProducto(id).subscribe(data =>{
      this.toastr.error("El producto fue eliminado con exito","Producto eliminado");
      this.obtenerProductos();
    },error =>{
      console.log(error);
    });
  }

}
