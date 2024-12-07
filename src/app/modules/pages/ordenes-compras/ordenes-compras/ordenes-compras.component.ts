import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbCardModule, NbSelectModule, NbButtonModule, NbDatepickerModule, NbInputModule } from '@nebular/theme';
import { OrdenCompraInsertRequest } from '@Models/OrdenCompra';
import { OrdenCompraService, SucursalService } from '@Services';
import { ProveedorModel } from '@Models/Proveedor';
import { ProveedorService } from '@Services';
import { SucursalModel } from '@Models/Sucursal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordenes-compras',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf,NbCardModule, NbSelectModule, NbButtonModule, NbDatepickerModule, NbInputModule],
  templateUrl: './ordenes-compras.component.html',
  styleUrls: ['./ordenes-compras.component.scss']
})
export class OrdenesComprasComponent implements OnInit{
  private ordenCompraService = inject(OrdenCompraService);
  private proveedorService = inject(ProveedorService);
  private sucursalService = inject(SucursalService);
  private fb = inject(FormBuilder)
  private router = inject(Router)

  proveedoresList: ProveedorModel[] = [];
  sucursalesList: SucursalModel[] = [];
  compradoresList = [
    {id: 1, nombre:"BSaravia"},
    {id: 2, nomnre:"RSillas"},
    {id: 3, nombre:"JPerez"},
    {id: 8, nombre:"GBorrego"},
    {id:16, nombre:"SVillareal"}
  ]

  form = this.fb.nonNullable.group({
    id: [0],
    idProveedor: [0, [Validators.required, Validators.min(1)]],
    fechaLlegada: ['', Validators.required],
    idSucursal: [0, [Validators.required, Validators.min(1)]],
    idComprador: [0, [Validators.required, Validators.min(1)]],
  })

  ngOnInit(): void {
    this.getProveedores();
    this.getSucursales();
  }

  getProveedores(): void {
    this.proveedorService.getProveedores().subscribe((data) =>{
      this.proveedoresList = data.Response.data;
    })
  }

  getSucursales(): void {
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursalesList = data;
    })
  }

  onSubmit(): void {
    if (this.form.valid)
    {
      const { id, idProveedor, fechaLlegada, idSucursal, idComprador } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const request: OrdenCompraInsertRequest = {
        idProveedor: idProveedor,
        fechaLlegada: fechaLlegada,
        idSucursal: idSucursal,
        idComprador: idComprador,
        usuarioActualiza: usuarioActualiza
      }

      const serviceCall = this.ordenCompraService.insertOrdenCompra(request)
      serviceCall.subscribe({
        next: (res: any) => {
          this.showDetalleOrdenCompra(res.response.data);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }

  showDetalleOrdenCompra(id: number): void {
    this.router.navigate(['pages/ordenes-compras/detalles', id])
  }
}
