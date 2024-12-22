import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { UnidadMedidaInsertRequest, UnidadMedidaModel, UnidadMedidaUpdateRequest } from '@Models/UnidadMedida';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { SweetAlertService } from '@Service/SweetAlert';
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
  private sweetAlertService = inject(SweetAlertService)
  private fb = inject(FormBuilder)

  unidadesMedidasList: UnidadMedidaModel[] = []

  form = this.fb.nonNullable.group({
    id: [0],
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
      const { id,nombre } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: UnidadMedidaInsertRequest = {
        nombre: nombre,
        usuarioActualiza: usuarioActualiza
      }

      const updateRequest: UnidadMedidaUpdateRequest = {
        id: id,
        nombre: nombre,
        usuarioActualiza: usuarioActualiza
      }

      const serviceCall = id === 0 ? this.unidadMedidaService.insertUnidadMedida(insertRequest) :this.unidadMedidaService.updateUnidadMedida(updateRequest)
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
      id: 0,
      nombre: '',
    })
  }

  editUnidadMedida(data: UnidadMedidaModel) {
    this.form.patchValue({
      id: data.Id,
      nombre: data.Nombre
    })
  }

  deleteUnidadMedida(Id: number) {
    this.sweetAlertService.confirm({
      title: 'Eliminar Unidad de Medida',
      text: '¿Estás seguro que desea eliminar la unidad de medida?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.unidadMedidaService.deleteUnidadMedida(Id).subscribe({
          next: (res: any) => {
            console.log(res)
            this.getUnidadesMedida()
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      }
    })
  }
}
