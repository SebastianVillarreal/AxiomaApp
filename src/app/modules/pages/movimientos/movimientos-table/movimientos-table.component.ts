import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { tipoMovimientos } from '@Global/endpoints';
import { MovimientoModel, MovimientoUpdateRequest } from '@Models/Movimiento';
import { SucursalModel } from '@Models/Sucursal';
import { TipoMovimientoModel } from '@Models/TipoMovimiento';
import { NbButtonModule, NbCardModule, NbDialogModule, NbDialogRef, NbDialogService, NbRadioModule, NbSelectModule } from '@nebular/theme';
import { SweetAlertService } from '@Service/SweetAlert';
import { MovimientoService, SucursalService, TipoMovimientoService } from '@Services';

@Component({
  selector: 'app-movimientos-table',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf, NgFor, NbSelectModule, NbCardModule, NbButtonModule, NbDialogModule, NbRadioModule],
  templateUrl: './movimientos-table.component.html',
  styleUrls: ['./movimientos-table.component.scss']
})
export class MovimientosTableComponent implements OnInit {
  private movimientoService = inject(MovimientoService)
  private sucursalService = inject(SucursalService)
  private tipoService = inject(TipoMovimientoService)
  private sweetAlertService = inject(SweetAlertService)
  private dialogService = inject(NbDialogService)
  private fb = inject(FormBuilder)

  constructor(@Optional() private dialogRef: NbDialogRef<any>) { }
  @ViewChild('dialog') dialog!: TemplateRef<any>

  movimientosList: MovimientoModel[] = []
  sucursalesList: SucursalModel[] = []
  tipoMovimientosList: TipoMovimientoModel[] = []

  form = this.fb.nonNullable.group({
    id: [0],
    idAlmacen: [0, [Validators.required, Validators.min(1)]],
    tipoMovimiento: [0, [Validators.required, Validators.min(1)]],
    estatus: [1]
  })

  ngOnInit(): void {
    this.getMovimientos()
    this.getSucursales()
    this.getTipos()
  }

  getMovimientos(): void {
    this.movimientoService.getMovimientos().subscribe((data) => {
      this.movimientosList = data.Response.data.Movimientos
    })
  }

  getSucursales(): void {
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursalesList = data
    })
  }

  getTipos(): void {
    this.tipoService.getTiposMovimiento().subscribe((data) => {
      this.tipoMovimientosList = data
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { id, idAlmacen, tipoMovimiento, estatus } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const updateRequest: MovimientoUpdateRequest = {
        id: id,
        idAlmacen: idAlmacen,
        tipoMovimiento: tipoMovimiento,
        estatus: estatus,
        usuarioActualiza: usuarioActualiza,
        usuarioAutoriza: usuarioActualiza,
        usuarioRegistra: usuarioActualiza
      }
      
      const serviceCall = this.movimientoService.updateMovimiento(updateRequest)
      serviceCall.subscribe({
        next: (res: any) => {
          this.getMovimientos()
          this.resetForm()
          this.dialogRef.close()
        },
        error: (err: any) => {
          console.error(err)
        }
      })
    }
  }

  resetForm() {
    this.form.reset({
      id: 0,
      idAlmacen: 0,
      tipoMovimiento: 0,
      estatus: 1
    })
  }

  exportMovimientos(): void {
    this.movimientoService.exportMovimientos().subscribe((data) => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Movimientos.xlsx';
      a.click();
    },
      error => {
      console.log(error)
    })
  }

  deleteMovimiento(Id: number) {
    this.sweetAlertService.confirm({
      title: 'Eliminar Movimiento',
      text: '¿Estás seguro que deseas eliminar este movimiento?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.movimientoService.deleteMovimiento(Id).subscribe({
          next: (res: any) => {
            this.getMovimientos()
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
    })
  }

  editMovimiento(data: MovimientoModel): void {
    this.dialogRef = this.dialogService.open(this.dialog, {context: data})
    const almacen = this.sucursalesList.find(sucursal => sucursal.Nombre === data.NombreAlmacen)
    const tipo = this.tipoMovimientosList.find(tipo => tipo.Descripcion == data.TipoMovimiento)
    this.form.patchValue({
      id: data.Id,
      idAlmacen: almacen?.Id,
      tipoMovimiento: tipo?.Id,
    })
  }
}
