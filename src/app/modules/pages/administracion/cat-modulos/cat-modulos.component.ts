import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { CatModuloInsertRequest, CatModuloModel } from '@Models/CatModulo';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { CatModuloService } from '@Services';

@Component({
  selector: 'app-cat-modulos',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf, NbCardModule, NbInputModule, NbButtonModule],
  templateUrl: './cat-modulos.component.html',
  styleUrls: ['./cat-modulos.component.scss']
})
export class CatModulosComponent implements OnInit{
  private categoriaService = inject(CatModuloService)
  private fb = inject(FormBuilder)

  categoriasList: CatModuloModel[] = []
  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required]
  })

  ngOnInit(): void {
    this.getCategorias()
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categoriasList = data.Response.data
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { nombre, descripcion } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: CatModuloInsertRequest = {
        nombre: nombre,
        descripcion: descripcion,
        usuario: usuarioActualiza
      }

      const serviceCall = this.categoriaService.insertCategoria(insertRequest)
      serviceCall.subscribe({
        next: (res: any) => {
          console.log(res)
          this.getCategorias()
          this.resetForm()
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }

  resetForm(): void{
    this.form.reset({
      nombre: '',
      descripcion: ''
    })
  }

}
