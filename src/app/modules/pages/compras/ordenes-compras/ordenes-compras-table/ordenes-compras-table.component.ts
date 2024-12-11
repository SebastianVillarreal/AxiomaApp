import { Component, inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NbCardModule,NbInputModule, NbSelectModule, NbDialogModule, NbDialogService, NbDialogRef, NbDatepickerModule, NbButtonModule } from '@nebular/theme';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomTableComponent } from '@Component/Table';
import { OrdenCompraModel, OrdenCompraUpdateRequest } from '@Models/OrdenCompra';
import { OrdenCompraService, ProveedorService, SucursalService } from '@Services';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { ProveedorModel } from '@Models/Proveedor';
import { SucursalModel } from '@Models/Sucursal';
import * as moment from 'moment';

@Component({
  selector: 'app-ordenes-compras-table',
  standalone: true,
  imports: [CustomTableComponent, NgIf, NgFor,ReactiveFormsModule, NbCardModule, NbInputModule, NbSelectModule, NbDialogModule, NbDatepickerModule, NbButtonModule],
  templateUrl: './ordenes-compras-table.component.html',
  styleUrls: ['./ordenes-compras-table.component.scss']
})
export class OrdenesComprasTableComponent implements OnInit {
  private ordenCompraService = inject(OrdenCompraService)
  private sweetAlertService = inject(SweetAlertService)
  private router = inject(Router)
  private fb = inject(FormBuilder)
  private proveedorService = inject(ProveedorService)
  private sucursalService = inject(SucursalService)
  private dialogService = inject(NbDialogService)

  constructor(@Optional() private dialogRef: NbDialogRef<any>,
  ) {}

  ordenesComprasList: OrdenCompraModel[] = []
  proveedoresList: ProveedorModel[] = []
  sucursalesList: SucursalModel[] = []
  compradoresList = [
    {id: 1, nombre:"BSaravia"},
    {id: 2, nomnre:"RSillas"},
    {id: 3, nombre:"JPerez"},
    {id: 8, nombre:"GBorrego"},
    {id:16, nombre:"SVillareal"}
  ]

  @ViewChild('dialog') dialog!: TemplateRef<any>

  form = this.fb.nonNullable.group({
    id: [0],
    idProveedor: [0, [Validators.required, Validators.min(1)]],
    fechaLlegada: [new Date(), [Validators.required]],
    idSucursal: [0, [Validators.required, Validators.min(1)]],
    idComprador: [0, [Validators.required, Validators.min(1)]]
  })
  ngOnInit(): void {
    this.getOrdenesCompras()
    this.getProveedores()
    this.getSucursales()
  }
  
  getOrdenesCompras(): void {
    this.ordenCompraService.getOrdenCompra().subscribe((data) =>
      this.ordenesComprasList = data.Response.data
    )
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

  
  open(dialog: TemplateRef<any>, data:OrdenCompraModel) {
    this.dialogRef = this.dialogService.open(dialog, {context: data})
  }

  updateOrdenCompra(): void {
    if (this.form.valid) {
      const {id, idProveedor, fechaLlegada, idComprador, idSucursal} = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario')??'0')

      const requestUpdate: OrdenCompraUpdateRequest = {
        idOrden: id,
        idProveedor: idProveedor,
        fechaLlegada: fechaLlegada,
        idComprador: idComprador,
        idSurcursal: idSucursal,
        usuarioActualiza: usuarioActualiza
      }

      this.ordenCompraService.updateOrdenCompra(requestUpdate).subscribe({
        next: (res: any) => {
          this.getOrdenesCompras();
          this.dialogRef.close()
        },
        error: (err: any) =>{
          console.error(err)
        }
      })
    }
  }


  formatoFecha(fecha: string): Date {   
    const partesFecha = fecha.split('/')
    const formatoFechaValida = `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}`
    return new Date(formatoFechaValida)
  }

  editOrdenCompra(data: OrdenCompraModel): void {
    this.open(this.dialog, data);
    const proveedor = this.proveedoresList.find(proveedor => proveedor.Nombre === data.IdProveedor)
    const sucursal = this.sucursalesList.find(sucursal => sucursal.Nombre === data.IdSurcursal)
    const comprador = this.compradoresList.find(comprador => comprador.nombre === data.IdComprador)

    this.form.patchValue({
      id: data.Id,
      idProveedor: proveedor?.Id,
      fechaLlegada: this.formatoFecha(data.FechaLlegada),
      idSucursal: sucursal?.Id,
      idComprador: comprador?.id
    })

  }

  deleteOrdenCompra(Id: number): void {
    this.sweetAlertService.confirm({
      title: '¿Estás seguro que deseas eliminar esta orden de compra?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordenCompraService.deleteOrdenCompra(Id)
          .subscribe({
            next: (res) => {
              this.getOrdenesCompras();
            },
            error: (err) => {
              console.log(err);
            }
          });
      }
    });    
  }

  showDetallesOrdenCompra(data: OrdenCompraModel): void{
    this.router.navigate(['pages/compras/ordenes-compras/detalles',data.Id])
  }

}
