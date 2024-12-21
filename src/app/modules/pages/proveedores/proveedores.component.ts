import { NgIf, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { BancoModel } from '@Models/Banco';
import { ProveedorInsertRequest, ProveedorModel, ProveedorUpdateRequest } from '@Models/Proveedor';
import { NbButtonModule, NbCardModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { BancoService, ProveedorService } from '@Services';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf, NgFor, NbInputModule, NbSelectModule, NbCardModule, NbButtonModule],
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit{
  private proveedorService = inject(ProveedorService)
  private bancoService = inject(BancoService)
  private fb = inject(FormBuilder)

  proveedoresList: ProveedorModel[] = []
  bancosList: BancoModel[] = []
  form = this.fb.nonNullable.group({
    id: [0],
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    idBanco: [0, [Validators.required, Validators.min(1)]],
    plazoPago: [0, Validators.required],
    correo: ['', [Validators.required]],
    rfc: ['', [Validators.required]],
    razonSocial: ['', [Validators.required]],
    clabe: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.getProveedores()
    this.getBancos()
  }

  getProveedores(): void {
    this.proveedorService.getProveedores().subscribe((data) => {
      this.proveedoresList = data.Response.data
    })
  }

  getBancos(): void {
    this.bancoService.GetAllBancos().subscribe((data) => {
      this.bancosList = data.Response.data
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { id,nombre, direccion, telefono, idBanco, plazoPago, correo, rfc, razonSocial, clabe } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')

      const insertRequest: ProveedorInsertRequest = {
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
        idBanco: idBanco,
        plazoPago: plazoPago,
        correo: correo,
        rfc: rfc,
        razonSocial: razonSocial,
        clabe: clabe,
        usuarioActualiza: usuarioActualiza
      }

      const updateRequest: ProveedorUpdateRequest = {
        id: id,
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
        idBanco: idBanco,
        plazoPago: plazoPago,
        correo: correo,
        rfc: rfc,
        razonSocial: razonSocial,
        clabe: clabe,
        usuarioActualiza: usuarioActualiza
      }

      const serviceCall = id == 0 ? this.proveedorService.insertProveedor(insertRequest) : this.proveedorService.updateProveedor(updateRequest)

      serviceCall.subscribe({
        next: (res: any) => {
          console.log(res)
          this.getProveedores()
          this.resetForm()
        },
        error: (err: any) => {
          console.error(err)
        }
      })
    }
  }

  resetForm(): void {
    this.form.reset({
      id: 0,
      nombre: '',
      direccion: '',
      telefono: '',
      idBanco: 0,
      plazoPago: 0,
      correo: '',
      rfc: '',
      razonSocial: '',
      clabe: ''
    })
  }

  editProveedor(data: ProveedorModel) {
    this.form.patchValue({
      id: data.Id,
      nombre: data.Nombre,
      direccion: data.Direccion,
      telefono: data.Telefono,
      idBanco: data.IdBanco,
      plazoPago: data.PlazoPago,
      correo: data.Correo,
      rfc: data.RFC,
      razonSocial: data.RazonSocial,
      clabe: data.CLABE
    })
  }
}
