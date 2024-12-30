import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomTableComponent } from '@Component/Table';
import { tipoMovimientos } from '@Global/endpoints';
import { MovimientoModel, MovimientoUpdateRequest } from '@Models/Movimiento';
import { ReportGetRequest, ReportKardexMovModel } from '@Models/ReporteKardexMov';
import { SucursalModel } from '@Models/Sucursal';
import { TipoMovimientoModel } from '@Models/TipoMovimiento';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbDialogRef, NbDialogService, NbInputModule, NbRadioModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { SweetAlertService } from '@Service/SweetAlert';
import { MovimientoService, ReportKardexMovService, SucursalService, TipoMovimientoService } from '@Services';

@Component({
  selector: 'app-movimientos-table',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf, NgFor, NbSelectModule, NbCardModule, NbButtonModule, NbDialogModule, NbInputModule,NbRadioModule, NbTabsetModule, NbDatepickerModule],
  templateUrl: './movimientos-table.component.html',
  styleUrls: ['./movimientos-table.component.scss']
})
export class MovimientosTableComponent implements OnInit {
  private movimientoService = inject(MovimientoService)
  private reportService = inject(ReportKardexMovService)
  private sucursalService = inject(SucursalService)
  private tipoService = inject(TipoMovimientoService)
  private sweetAlertService = inject(SweetAlertService)
  private dialogService = inject(NbDialogService)
  private datePipe = inject(DatePipe)
  private router = inject(Router)
  private fb = inject(FormBuilder)

  constructor(@Optional() private dialogRef: NbDialogRef<any>) { }
  @ViewChild('dialog') dialog!: TemplateRef<any>

  movimientosList: MovimientoModel[] = []
  reportMovimientosList: ReportKardexMovModel[] = []
  sucursalesList: SucursalModel[] = []
  tipoMovimientosList: TipoMovimientoModel[] = []

  form = this.fb.nonNullable.group({
    id: [0],
    idAlmacen: [0, [Validators.required, Validators.min(1)]],
    tipoMovimiento: [0, [Validators.required, Validators.min(1)]],
    estatus: [1]
  })

  filter = this.fb.nonNullable.group({
    fechaInicio: ['', [Validators.required]],
    fechaFinal: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.getMovimientos()
    this.getSucursales()
    this.getTipos()
    this.getReportMovimientos()
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

  getReportMovimientos(): void {
    const { fechaInicio, fechaFinal } = this.filter.getRawValue()
    const filterRequest: ReportGetRequest = {
      FechaInicio: this.datePipe.transform(fechaInicio,'MM/dd/yyyy')??'',
      FechaFinal: this.datePipe.transform(fechaFinal, 'MM/dd/yyyy')??'',
    }
    this.reportService.getReportKardexMov(filterRequest).subscribe((data) => {
      this.reportMovimientosList = data
      console.log(data)
    })
  }

  onSubmit(action: string): void {
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
      
      const serviceCall = action == 'guardar' ? this.movimientoService.updateMovimiento(updateRequest) : this.movimientoService.updateFechaAutoriza(id)
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

  showDetails(data: MovimientoModel): void {
    this.router.navigate(['pages/movimientos/detalles', data.Id])
  }

  exportReportMovimientos(): void {
    this.reportService.exportReportKardexMov().subscribe((data) => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ReportKardexMov.xlsx';
      a.click();
    },
      error => {
      console.log(error)
    })
  }
}
