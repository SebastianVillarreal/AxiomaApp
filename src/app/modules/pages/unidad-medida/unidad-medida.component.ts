import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { UnidadMedidaInsertRequest, UnidadMedidaModel } from '@Models/UnidadMedida';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { UnidadMedidaService } from '@Services';

@Component({
  selector: 'app-unidad-medida',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf, NbInputModule, NbCardModule, NbButtonModule],
  templateUrl: './unidad-medida.component.html',
  styleUrls: ['./unidad-medida.component.scss']
})
export class UnidadMedidaComponent implements OnInit{
  private unidadMedidaService = inject(UnidadMedidaService)
  private fb = inject(FormBuilder)

  unidadesMedidasList: UnidadMedidaModel[] = []

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.getUnidadesMedida()
  }

  getUnidadesMedida(): void {
    this.unidadMedidaService.getUnidadesMedidas().subscribe((data) => {
      this.unidadesMedidasList = data
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { nombre } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: UnidadMedidaInsertRequest = {
        nombre: nombre,
        usuarioActualiza: usuarioActualiza
      }

      const serviceCall = this.unidadMedidaService.insertUnidadMedida(insertRequest)
      serviceCall.subscribe({
        next: (res: any) => {
          console.log(res)
          this.getUnidadesMedida()
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
      nombre: ''
    })
  }

}
