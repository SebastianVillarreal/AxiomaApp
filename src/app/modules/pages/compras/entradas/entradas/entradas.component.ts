import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NbCardModule, NbInputModule, NbSelectModule, NbButtonModule } from '@nebular/theme';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntradaInsertRequest } from '@Models/Entrada';
import { ProveedorModel } from '@Models/Proveedor';
import { SucursalModel } from '@Models/Sucursal';
import { EntradaService, ProveedorService, SucursalService } from '@Services';

@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf,NbCardModule, NbButtonModule, NbInputModule, NbSelectModule],
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit{
  private fb = inject(FormBuilder)
  private entradaService = inject(EntradaService)
  private sucursalService = inject(SucursalService)
  private proveedorService = inject(ProveedorService)

  sucursalesList: SucursalModel[] = []
  proveedoresList: ProveedorModel[] = []

  form = this.fb.nonNullable.group({
    idProveedor: [0, [Validators.required, Validators.min(1)]],
    factura: ['', [Validators.required]],
    idSucursal: [0, [Validators.required, Validators.min(1)]],
  })

  ngOnInit(): void {
    this.getProveedores()
    this.getSucursales()
  }

  getProveedores(): void {
    this.proveedorService.getProveedores().subscribe((data) => {
      this.proveedoresList = data.Response.data
    })
  }

  getSucursales(): void {
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursalesList = data
    })
  }

  onSubmit(): void{
    if (this.form.valid) {
      const { idProveedor, factura, idSucursal } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const request: EntradaInsertRequest = {
        idProveedor: idProveedor,
        factura: factura,
        idSurcursal: idSucursal,
        usuarioActualiza: usuarioActualiza
      }

      this.entradaService.insertEntrada(request).subscribe(
        {
          next: (res: any) => {
            console.log(res)
          },
          error: (err: any) => {
            console.log(err)
          }
        }
      )
    }
  }
}
