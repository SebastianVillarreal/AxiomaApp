import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { SucursalInsertRequest, SucursalModel } from '@Models/Sucursal';
import { NbButton, NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { SucursalService } from '@Services';

@Component({
  selector: 'app-sucursales',
  standalone: true, 
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf, NbCardModule, NbButtonModule, NbInputModule],
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {
  private sucursalService = inject(SucursalService);
  private fb = inject(FormBuilder)

  sucursalesList: SucursalModel[] = [];
  form = this.fb.nonNullable.group({
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
      const { nombre, direccion } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: SucursalInsertRequest = {
        nombre: nombre,
        direccion: direccion,
        idUsuario: usuarioActualiza
      }

      const serviceCall = this.sucursalService.insertSucursal(insertRequest)
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
      nombre: '',
      direccion: ''
    })
  }
}
