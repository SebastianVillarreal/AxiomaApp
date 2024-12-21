import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { ExistenciaInsertRequest, ExistenciaModel, ExistenciaUpdateRequest } from '@Models/Existencia';
import { InsumoModel } from '@Models/Insumo';
import { NbButtonModule, NbCardModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { SweetAlertService } from '@Service/SweetAlert';
import { ExistenciaService, InsumoService } from '@Services';

@Component({
  selector: 'app-existencias',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf,NgFor,NbInputModule, NbCardModule, NbButtonModule, NbSelectModule],
  templateUrl: './existencias.component.html',
  styleUrls: ['./existencias.component.scss']
})
export class ExistenciasComponent implements OnInit{
  private existenciaService = inject(ExistenciaService)
  private insumoService = inject(InsumoService)
  private sweetAlertService = inject(SweetAlertService)
  private fb = inject(FormBuilder)

  existenciasList: ExistenciaModel[] = []
  insumosList: InsumoModel[] = []

  form = this.fb.nonNullable.group({
    id: [0],
    insumo: ['', [Validators.required]],
    idAlmacen: [0, [Validators.required, Validators.min(1)]],
    cantidad: [0, [Validators.required]],
  })

  ngOnInit(): void {
    this.getExistencias()
    this.getInsumos()
  }

  getExistencias(): void {
    this.existenciaService.getExistencias().subscribe((data) => {
      this.existenciasList = data.Response.data
    })
  }

  getInsumos(): void {
    this.insumoService.GetAllInsumos().subscribe((data) => {
      this.insumosList = data.Response.data
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { id, insumo, idAlmacen, cantidad } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: ExistenciaInsertRequest = {
        insumo: insumo,
        idAlmacen: idAlmacen,
        cantidad: cantidad,
        usuarioActualiza: usuarioActualiza
      }

      const updateRequest: ExistenciaUpdateRequest = {
        id: id,
        insumo: insumo,
        idAlmacen: idAlmacen,
        cantidad: cantidad,
        usuarioActualiza: usuarioActualiza
      }

      const serviceCall = id === 0 ? this.existenciaService.insertExistencia(insertRequest) : this.existenciaService.updateExistencia(updateRequest)
      serviceCall.subscribe({
        next: (res: any) => {
          console.log(res)
          this.getExistencias()
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
      insumo: '',
      idAlmacen: 0,
      cantidad: 0
    })
  }

  editExistencia(data: ExistenciaModel): void{
    this.form.patchValue({
      id: data.Id,
      insumo: data.Insumo,
      idAlmacen: data.IdAlmacen,
      cantidad: data.Cantidad
    })
  }

  deleteExistencia(Id: number): void {
    this.sweetAlertService.confirm({
      title: 'Eliminar Existencia',
      text: '¿Estás seguro que desea eliminar la existencia?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.existenciaService.deleteExistencia(Id).subscribe({
          next: (res: any) => {
            console.log(res)
            this.getExistencias()
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      }
    })
  }
}
