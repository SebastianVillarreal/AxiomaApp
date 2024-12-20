import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { CatModuloInsertRequest, CatModuloModel, CatModuloUpdateRequest } from '@Models/CatModulo';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { SweetAlertService } from '@Service/SweetAlert';
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
  private sweetAlertService = inject(SweetAlertService)
  private fb = inject(FormBuilder)

  categoriasList: CatModuloModel[] = []
  form = this.fb.nonNullable.group({
    id: [0],
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
      const {id, nombre, descripcion } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: CatModuloInsertRequest = {
        nombre: nombre,
        descripcion: descripcion,
        usuario: usuarioActualiza
      }

      const updateRequest: CatModuloUpdateRequest = {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        usuario: usuarioActualiza
      }

      const serviceCall = id == 0 ? this.categoriaService.insertCategoria(insertRequest) : this.categoriaService.updateCategoria(updateRequest)
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
      id: 0,
      nombre: '',
      descripcion: ''
    })
  }

  editCategoria(data: CatModuloModel): void{
    this.form.patchValue({
      id: data.Id,
      nombre: data.Nombre,
      descripcion: data.Descripcion
    })
  }

  deleteCategoria(Id: number): void {
    this.sweetAlertService.confirm({
      title: '¿Estás seguro que deseas eliminar esta categoría?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.deleteCategoria(Id)
          .subscribe({
            next: (res) => {
              console.log(res)
              this.getCategorias();
            },
            error: (err) => {
              console.log(err);
            }
          });
      }
    });
  }

}
