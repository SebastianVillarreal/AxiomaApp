import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { SucursalInsertRequest, SucursalModel, SucursalUpdateRequest } from '@Models/Sucursal';
import { NbButton, NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { SucursalService } from '@Services';
import { SweetAlertService } from '@Service/SweetAlert';

@Component({
  selector: 'app-sucursales',
  standalone: true, 
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf, NbCardModule, NbButtonModule, NbInputModule],
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {
  private sucursalService = inject(SucursalService);
  private sweetAlertService = inject(SweetAlertService);
  private fb = inject(FormBuilder)

  sucursalesList: SucursalModel[] = [];
  form = this.fb.nonNullable.group({
    id: [0],
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.getSucursales()
  }

  getSucursales(): void {
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursalesList = data;
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { id, nombre, direccion } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: SucursalInsertRequest = {
        nombre: nombre,
        direccion: direccion,
        idUsuario: usuarioActualiza
      }

      const updateRequest: SucursalUpdateRequest = {
        id: id,
        nombre: nombre,
        direccion: direccion,
        idUsuario: usuarioActualiza
      }

      const serviceCall = id === 0 ? this.sucursalService.insertSucursal(insertRequest) : this.sucursalService.updateSucursal(updateRequest)
      serviceCall.subscribe({
        next: (res: any) => {
          console.log(res)
          this.getSucursales()
          this.resetForm()
        },
        error: (err: any) => {
          console.log(err)
        }

      })
    }
  }


  resetForm(): void {
    this.form.reset({
      id: 0,
      nombre: '',
      direccion: ''
    })
  }

  editSucursal(data: SucursalModel) {
    this.form.patchValue({
      id: data.Id,
      nombre: data.Nombre,
      direccion: data.Direccion
    })
  }

  deleteSucursal(Id: number) {
    this.sweetAlertService.confirm({
      title: 'Eliminar Sucursal',
      text: '¿Estás seguro de eliminar la sucursal?',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sucursalService.deleteSucursal(Id).subscribe({
          next: (res: any) => {
            console.log(res)
            this.getSucursales()
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      }
    })
  }
}
