import { Component, inject, OnInit, ViewChild, TemplateRef, Optional } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { EntradaService, ProveedorService, SucursalService } from '@Services';
import { CustomTableComponent } from '@Component/Table';
import { EntradaModel, EntradaUpdateRequest } from '@Models/Entrada';
import { SweetAlertService } from '@Service/SweetAlert';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbDialogRef, NbDialogService, NbInputModule, NbSelectModule } from '@nebular/theme';
import { ProveedorModel } from '@Models/Proveedor';
import { SucursalModel } from '@Models/Sucursal';

@Component({
  selector: 'app-entradas-table',
  standalone: true,
  imports: [CustomTableComponent, NgIf, NgFor,ReactiveFormsModule, NbDialogModule, NbButtonModule, NbInputModule, NbSelectModule, NbCardModule, NbDatepickerModule],
  templateUrl: './entradas-table.component.html',
  styleUrls: ['./entradas-table.component.scss']
})
export class EntradasTableComponent implements OnInit {
  private entradasService = inject(EntradaService)
  private sweetAlertService = inject(SweetAlertService)
  private proveedorService = inject(ProveedorService)
  private sucursalService = inject(SucursalService)
  private dialogService = inject(NbDialogService)
  private fb = inject(FormBuilder)

  constructor(@Optional() private dialogRef: NbDialogRef<any>){}

  entradasList: EntradaModel[] = []
  proveedoresList: ProveedorModel[] = []
  sucursalesList: SucursalModel[] = []

  @ViewChild('dialog') dialog!: TemplateRef<any>
  
  form = this.fb.nonNullable.group({
    id: [0],
    idProveedor: [0, [Validators.required, Validators.min(1)]],
    factura: ['', [Validators.required]],
    idSucursal: [0, [Validators.required, Validators.min(1)]],
    fechaEntrega: ['', [Validators.required]],
    fechaActualiza: ['']
  })

  ngOnInit(): void {
    this.getEntradas()
    this.getProveedores()
    this.getSucursales()
  }

  getEntradas(): void {
    this.entradasService.getEntrada().subscribe((data) => {
      this.entradasList = data.Response.data
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

  open(dialog: TemplateRef<any>, data:EntradaModel) {
    this.dialogRef = this.dialogService.open(dialog, {context: data})
  }

  formatFecha(fecha: string): string {   
    const partesFecha = fecha.split('/')
    const fechaValida = `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}`
    return fechaValida
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
      fechaEntrega: this.formatFecha(data.FechaEntrega),
      fechaActualiza: this.formatFecha(data.FechaActualiza)
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





}
