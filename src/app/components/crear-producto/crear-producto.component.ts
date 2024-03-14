import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/productos';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {

  productoForm : FormGroup;

  titulo="Crear producto";

  id : string | null;

  constructor(private fb: FormBuilder,
              private router:Router,
              private toastr: ToastrService,
              private _productoService:ProductoService,
              private aRouter: ActivatedRoute
              ){
    this.productoForm = this.fb.group({
      producto:['',Validators.required],
      categoria:['',Validators.required],
      ubicacion:['',Validators.required],
      precio:['',Validators.required],
    })

    this.id = this.aRouter.snapshot.paramMap.get('id');

  };

  ngOnInit() : void {
    this.esEditar();
  }


  GuardarProducto(){

    const PRODUCTO : Producto = {
      producto: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    }  
    // console.log(PRODUCTO);


    if(this.id !==null){
      // editar

      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data =>{
        this.toastr.info('El producto ha sido actualizado correctamente');
        this.router.navigate(['/']);
      },error =>{
        console.log('error')
        this.productoForm.reset();
      });

    }else{
      // Agregar
      this._productoService.guardarProducto(PRODUCTO).subscribe(data =>{
        this.toastr.success('El producto ha sido guardado correctamente');
        this.router.navigate(['/']);
      },error =>{
        console.log('error')
        this.productoForm.reset();
      })
    }
    
  }


  esEditar(){
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data =>{
        console.log(data);
        
        this.productoForm.setValue({
          producto:data.producto,
          categoria:data.categoria,
          ubicacion:data.ubicacion,
          precio:data.precio,
        })
        
      })
    }
  }


}
