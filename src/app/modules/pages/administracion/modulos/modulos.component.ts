import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { CatModuloModel } from '@Models/CatModulo';
import { ModuloInsertRequest, ModuloModel, ModuloUpdateRequest } from '@Models/Modulo';
import { NbButton, NbButtonModule, NbCardModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { SweetAlertService } from '@Service/SweetAlert';
import { CatModuloService, ModuloService, } from '@Services';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf,NgFor,NbInputModule, NbSelectModule, NbButtonModule, NbCardModule],
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})
export class ModulosComponent implements OnInit{
  private moduloService = inject(ModuloService)
  private categoriaService = inject(CatModuloService)
  private sweetAlertService = inject(SweetAlertService)
  private fb = inject(FormBuilder)

  modulosList: ModuloModel[] = []
  categoriasList: CatModuloModel[] = []
  form = this.fb.nonNullable.group({
    id: [0],
    nombreModulo: ['', Validators.required],
    categoriaModulo: [0, [Validators.required, Validators.min(1)]]
  })

  ngOnInit(): void {
    this.getModulos()
    this.getCategorias()
  }

  getModulos(): void {
    this.moduloService.getModulos().subscribe((data) => {
      this.modulosList = data.Response.data
    })
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categoriasList = data.Response.data
      console.log(this.categoriasList)
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { id, nombreModulo, categoriaModulo } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: ModuloInsertRequest = {
        nombreModulo: nombreModulo,
        categoriaModulo: categoriaModulo,
        usuario: usuarioActualiza
      }

      const updateRequest: ModuloUpdateRequest = {
        id: id,
        nombreModulo: nombreModulo,
        categoriaModulo: categoriaModulo,
        usuario: usuarioActualiza
      }

      const serviceCall = id == 0 ? this.moduloService.insertModulo(insertRequest) : this.moduloService.updateModulo(updateRequest)
      serviceCall.subscribe({
        next: (res: any) => {
          console.log(res)
          this.getModulos()
          this.resetForm()
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }

  resetForm(): void {
    this.form.reset({
      id: 0,
      nombreModulo: '',
      categoriaModulo: 0
    })
  }

  editModulo(data: ModuloModel): void {
    const categoriaModulo = this.categoriasList.find(categoria => categoria.Nombre === data.CategoriaModulo)
    this.form.patchValue({
      id: data.Id,
      nombreModulo: data.Modulo,
      categoriaModulo: categoriaModulo?.Id
    })
  }

  deleteModulo(Id: number): void {
    this.sweetAlertService.confirm({
      title: '¿Estás seguro que deseas eliminar este módulo?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.moduloService.deleteModulo(Id)
          .subscribe({
            next: (res: any) => {
              console.log(res)
              this.getModulos()
            },
            error: (err: any) => {
              console.log(err)
            }
        })
      }
    })
  }
}
