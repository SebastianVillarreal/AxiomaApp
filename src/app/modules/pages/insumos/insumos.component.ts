import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NbCardModule, NbInputModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';

import { InsumoService } from '@Services';
import { InsumoModel, GetInsumoResponse, InsumoInsertRequest, InsumoUpdateRequest } from '@Models/Insumo';

@Component({
  selector: 'app-insumos',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NbCardModule, NbInputModule, NbButtonModule, NbSelectModule, NgIf, NgFor],
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss']
})
export class InsumosComponent implements OnInit{
  unidadesMedidaList = [
    { id: 1, nombre: 'Kilogramo' },
    { id: 2, nombre: 'Gramo' },
    { id: 3, nombre: 'Paquete' },
    { id: 4, nombre: 'Pieza' },
    { id: 5, nombre: 'Litro' },
    { id: 6, nombre: 'Mililitro' },
    { id: 7, nombre: 'Metro' },
    { id: 8, nombre: 'Centímetro' },
  ];

  private insumoService = inject(InsumoService)
  private fb = inject(FormBuilder)

  insumosList: InsumoModel[] = []

  form = this.fb.nonNullable.group({
    id: [0],
    insumo: ['',[Validators.required]],
    descripcion: ['', [Validators.required]],
    insumosUP: ['', [Validators.required]],
    idUm: [0, [Validators.required, Validators.min(1)]],
    costo: [0, [Validators.required]],
  })

  ngOnInit(): void {
    this.getInsumos();
  }

  getInsumos() {
    this.insumoService.GetAllInsumos().subscribe((data) => {
      this.insumosList = data.Response.data;
    })
  }

  onSubmit(): void{
    if(this.form.valid)
    {
      const {id, insumo, descripcion, insumosUP, idUm, costo} = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario')??'0')

      const request: InsumoInsertRequest = {
        insumo: insumo,
        descripcionInsumo: descripcion,
        insumosUP: insumosUP,
        unidadMedida: idUm,
        costo: costo,
        usuarioActualiza: usuarioActualiza
      }

      const requestUpdate: InsumoUpdateRequest = {
        id: id,
        insumo: insumo,
        descripcionInsumo: descripcion,
        insumosUP: insumosUP,
        unidadMedida: idUm,
        costo: costo,
        usuarioActualiza: usuarioActualiza
      }

      const serviceCall = id == 0 ? this.insumoService.InsertInsumo(request) : this.insumoService.UpdateInsumo(requestUpdate)
      serviceCall.subscribe({
        next: (res: any) => {
          this.getInsumos()
          this.resetForm()
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }

  resetForm(): void{
    this.form.reset({
      id: 0,
      insumo: '',
      descripcion: '',
      insumosUP: '',
      idUm: 0,
      costo: 0
    })
  }

  editInsumo(data: InsumoModel)
  {

    const um = this.unidadesMedidaList.find(um => um.nombre.toLowerCase() === data.UnidadMedida.toLowerCase())
    this.form.patchValue({
      id: data.Id,
      insumo: data.Insumo,
      descripcion: data.Descripcion,
      insumosUP: data.InsumosUP,
      idUm: um?.id,
      costo: data.Costo
    }

    )
  }

  deleteInsumo(Id: number)
  {
    console.log(Id)
  }
}
