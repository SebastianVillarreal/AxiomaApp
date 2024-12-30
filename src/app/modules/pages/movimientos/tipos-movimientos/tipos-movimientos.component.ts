import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { TipoMovimientoInsertRequest, TipoMovimientoModel, TipoMovimientoUpdateRequest } from '@Models/TipoMovimiento';
import { NbButton, NbButtonModule, NbCardModule, NbInputModule, NbRadioModule } from '@nebular/theme';
import { SweetAlertService } from '@Service/SweetAlert';
import { TipoMovimientoService } from '@Services';

@Component({
  selector: 'app-tipos-movimientos',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf,NbInputModule, NbCardModule, NbButtonModule, NbRadioModule],
  templateUrl: './tipos-movimientos.component.html',
  styleUrls: ['./tipos-movimientos.component.scss']
})
export class TiposMovimientosComponent implements OnInit{
  private tiposService = inject(TipoMovimientoService)
  private sweetAlertService = inject(SweetAlertService)
  private fb = inject(FormBuilder)

  tiposList: TipoMovimientoModel[] = []

  form = this.fb.nonNullable.group({
    id: [0],
    descripcion: ["", [Validators.required]],
    estatus: [1]
  })

  ngOnInit(): void {
    this.getTipos()
  }

  getTipos(): void {
    this.tiposService.getTiposMovimiento().subscribe((data) => {
      this.tiposList = data
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { id, descripcion, estatus } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: TipoMovimientoInsertRequest = {
        descripcion: descripcion,
        usuarioActualiza: usuarioActualiza
      }

      const updateRequest: TipoMovimientoUpdateRequest = {
        id: id,
        descripcion: descripcion,
        usuarioActualiza: usuarioActualiza,
        estatus: estatus
      }

      const serviceCall = id == 0 ? this.tiposService.insertTipoMovimiento(insertRequest) : this.tiposService.updateTipoMovimiento(updateRequest)
      serviceCall.subscribe({
        next: (res: any) => {
          console.log(res)
          this.getTipos()
          this.resetForm()
        },
        error: (err: any) => {
          console.error(err)
        }
      })
    }
  }

  resetForm() {
    this.form.reset({
      descripcion: ""
    })
  }

  editTipo(data: TipoMovimientoModel) {
    this.form.patchValue({
      id: data.Id,
      descripcion: data.Descripcion
    })
  }

  deleteTipo(Id: number) {
    this.sweetAlertService.confirm({
      title: 'Eliminar Tipo Movimiento',
      text: '¿Estás seguro que deseas eliminar este tipo de movimiento?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tiposService.deleteTipoMovimiento(Id).subscribe({
          next: (res: any) => {
            this.getTipos()
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
    })
  }

}
