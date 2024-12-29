import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { TipoMovimientoInsertRequest, TipoMovimientoModel } from '@Models/TipoMovimiento';
import { NbButton, NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { TipoMovimientoService } from '@Services';

@Component({
  selector: 'app-tipos-movimientos',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf,NbInputModule, NbCardModule, NbButtonModule],
  templateUrl: './tipos-movimientos.component.html',
  styleUrls: ['./tipos-movimientos.component.scss']
})
export class TiposMovimientosComponent implements OnInit{
  private tiposService = inject(TipoMovimientoService)
  private fb = inject(FormBuilder)

  tiposList: TipoMovimientoModel[] = []

  form = this.fb.nonNullable.group({
    descripcion: ["", [Validators.required]]
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
      const { descripcion } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: TipoMovimientoInsertRequest = {
        descripcion: descripcion,
        usuarioActualiza: usuarioActualiza
      }

      const serviceCall = this.tiposService.insertTipoMovimiento(insertRequest)
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
}
