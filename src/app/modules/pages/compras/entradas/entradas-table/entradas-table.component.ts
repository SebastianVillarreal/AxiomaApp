import { Component, inject, OnInit, ViewChild, TemplateRef, Optional } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { DetalleEntradaService, EntradaService, ProveedorService, SucursalService } from '@Services';
import { CustomTableComponent } from '@Component/Table';
import { EntradaModel, EntradaUpdateRequest } from '@Models/Entrada';
import { SweetAlertService } from '@Service/SweetAlert';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbDialogRef, NbDialogService, NbInputModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { ProveedorModel } from '@Models/Proveedor';
import { SucursalModel } from '@Models/Sucursal';
import { ReporteEntradaModel } from '@Models/DetalleEntrada';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-entradas-table',
  standalone: true,
  imports: [CustomTableComponent, NgIf, NgFor,ReactiveFormsModule, NbDialogModule, NbButtonModule, NbInputModule, NbSelectModule, NbCardModule, NbDatepickerModule, NbTabsetModule],
  templateUrl: './entradas-table.component.html',
  styleUrls: ['./entradas-table.component.scss']
})
export class EntradasTableComponent implements OnInit {
  private entradasService = inject(EntradaService)
  private detalleEntradaService = inject(DetalleEntradaService)
  private sweetAlertService = inject(SweetAlertService)
  private proveedorService = inject(ProveedorService)
  private sucursalService = inject(SucursalService)
  private dialogService = inject(NbDialogService)
  private fb = inject(FormBuilder)
  private router = inject(Router)

  constructor(@Optional() private dialogRef: NbDialogRef<any>){}

  entradasList: EntradaModel[] = []
  reportEntradasList: ReporteEntradaModel[] = []
  proveedoresList: ProveedorModel[] = []
  sucursalesList: SucursalModel[] = []

  @ViewChild('dialog') dialog!: TemplateRef<any>
  
  form = this.fb.nonNullable.group({
    id: [0],
    idProveedor: [0, [Validators.required, Validators.min(1)]],
    factura: ['', [Validators.required]],
    idSucursal: [0, [Validators.required, Validators.min(1)]],
    fechaEntrega: [new Date(), [Validators.required]],
    fechaActualiza: [new Date()]
  })

  filterFecha = this.fb.nonNullable.group({
    fechaInicio: ['', [Validators.required]],
    fechaFin: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.getEntradas()
    this.getProveedores()
    this.getSucursales()
    this.getReportEntradas()
  }

  getEntradas(): void {
    this.entradasService.getEntrada().subscribe((data) => {
      this.entradasList = data.Response.data
    })
  }

  getReportEntradas(fechaInicio:string = '', fechaFin: string = ''): void {
    this.detalleEntradaService.getReportEntradas(fechaInicio, fechaFin).subscribe((data) => {
      this.reportEntradasList = data
    })
  }
  getProveedores(): void {
    this.proveedorService.getProveedores().subscribe((data) =>
      this.proveedoresList = data.Response.data
    )
  }

  getSucursales(): void {
    this.sucursalService.getSucursales().subscribe((data) =>
      this.sucursalesList = data
    )
  }

  filter(): void {
    const {fechaInicio, fechaFin} = this.filterFecha.getRawValue()
    const formatoFechaInicio = moment(fechaInicio).format('MM/DD/yyyy')
    const formatoFechaFin = moment(fechaFin).format('MM/DD/yyyy')
    this.getReportEntradas(formatoFechaInicio, formatoFechaFin)
    this.resetFilter()
  }
  
  resetFilter(): void {
    this.filterFecha.reset(
      {
        fechaInicio: '',
        fechaFin: '',
      }
    )
  }

  open(dialog: TemplateRef<any>, data:EntradaModel) {
    this.dialogRef = this.dialogService.open(dialog, {context: data})
  }

  formatoFecha(fecha: string): Date {   
    const partesFecha = fecha.split('/')
    const formatoFechaValida = `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}`
    return new Date(formatoFechaValida)
  }

  editEntrada(data: EntradaModel): void {
    this.open(this.dialog, data);
    const proveedor = this.proveedoresList.find(proveedor => proveedor.Nombre === data.Proveedor)
    const sucursal = this.sucursalesList.find(sucursal => sucursal.Nombre === data.Surcursal)

    this.form.patchValue({
      id: data.Id,
      idProveedor: proveedor?.Id,
      factura: data.Factura,
      idSucursal: sucursal?.Id,
      fechaEntrega: this.formatoFecha(data.FechaEntrega),
      fechaActualiza: this.formatoFecha(data.FechaActualiza)
    })
  }

  updateEntrada(): void {
    if (this.form.valid) {
      const { id, idProveedor, factura, idSucursal, fechaEntrega, fechaActualiza } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('IdUsuario') ?? '0')
      
      const requestUpdate: EntradaUpdateRequest = {
        id: id,
        idProveedor: idProveedor,
        factura: factura,
        idSurcursal: idSucursal,
        fechaEntrega: fechaEntrega,
        fechaActualiza: fechaActualiza,
        usuarioActualiza: usuarioActualiza
      }

      console.log(requestUpdate)

      this.entradasService.updateEntrada(requestUpdate).subscribe({
        next: (res: any) => {
          this.getEntradas()
          this.dialogRef.close()
        },
        error: (err: any) => {
          console.error(err)
        }
      })
    }
  }

  deleteEntrada(Id: number): void {
    this.sweetAlertService.confirm({
      title: '¿Estás seguro que deseas eliminar esta entrada?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entradasService.deleteEntrada(Id)
          .subscribe({
            next: (res) => {
              this.getEntradas();
            },
            error: (err) => {
              console.log(err);
            }
          });
      }
    });
  }

  exportEntradas(): void {
    this.detalleEntradaService.exportReportEntradas().subscribe((data) => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ReportEntradas.xlsx';
      a.click();
    },
      error => {
      console.log(error)
    })
  }

  showDetallesEntrada(data: EntradaModel): void {
    this.router.navigate(['pages/compras/entradas/detalles', data.Id])
  }



}
