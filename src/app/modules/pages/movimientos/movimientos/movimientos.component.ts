import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovimientoInsertRequest } from '@Models/Movimiento';
import { SucursalModel } from '@Models/Sucursal';
import { TipoMovimientoModel } from '@Models/TipoMovimiento';
import { NbButtonModule, NbCardModule, NbSelectModule } from '@nebular/theme';
import { MovimientoService, SucursalService, TipoMovimientoService } from '@Services';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, NbSelectModule, NbCardModule, NbButtonModule],
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit{
  private movimientoService = inject(MovimientoService)
  private sucursalService = inject(SucursalService)
  private tipoService = inject(TipoMovimientoService)
  private router = inject(Router)
  private fb = inject(FormBuilder)

  sucursalesList: SucursalModel[] = []
  tiposList: TipoMovimientoModel[] = []

  form = this.fb.nonNullable.group({
    idAlmacen: [0, [Validators.required, Validators.min(1)]],
    tipoMovimiento: [0, [Validators.required, Validators.min(1)]],
  })

  ngOnInit(): void {
    this.getSucursales()
    this.getTipos()
  }

  getSucursales(): void {
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursalesList = data
    })
  }

  getTipos(): void {
    this.tipoService.getTiposMovimiento().subscribe((data) => {
      this.tiposList = data
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { idAlmacen, tipoMovimiento } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: MovimientoInsertRequest = {
        idAlmacen: idAlmacen,
        tipoMovimiento: tipoMovimiento,
        usuarioActualiza: usuarioActualiza,
        usuarioRegistra: usuarioActualiza,
        usuarioAutoriza: usuarioActualiza
      }

      this.movimientoService.insertMovimiento(insertRequest).subscribe({
        next: (res: any) => {
          console.log(res)
          this.showDetallesMovimientos(res.response.data)
        },
        error: (err: any) => {
          console.error(err)
        }
      })
    }
  }

  showDetallesMovimientos(id: number): void {
    this.router.navigate(['pages/movimientos/detalles', id])
  }
}
