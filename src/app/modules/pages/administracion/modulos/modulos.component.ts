import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { CatModuloModel } from '@Models/CatModulo';
import { ModuloInsertRequest, ModuloModel } from '@Models/Modulo';
import { NbButton, NbButtonModule, NbCardModule, NbInputModule, NbSelectModule } from '@nebular/theme';
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
  private fb = inject(FormBuilder)

  modulosList: ModuloModel[] = []
  categoriasList: CatModuloModel[] = []
  form = this.fb.nonNullable.group({
    nombreModulo: ['', Validators.required],
    categoriaModulo: [0, [Validators.required, Validators.min(0)]]
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
      const { nombreModulo, categoriaModulo } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: ModuloInsertRequest = {
        nombreModulo: nombreModulo,
        categoriaModulo: categoriaModulo,
        usuario: usuarioActualiza
      }

      const serviceCall = this.moduloService.insertModulo(insertRequest)
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
      nombreModulo: '',
      categoriaModulo: 0
    })
  }
}
