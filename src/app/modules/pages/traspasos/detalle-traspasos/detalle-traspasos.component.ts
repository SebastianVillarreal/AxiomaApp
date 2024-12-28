import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomTableComponent } from '@Component/Table';
import { DetalleTraspasoInsertRequest, DetalleTraspasoModel, DetalleTraspasoUpdateRequest } from '@Models/DetalleTraspaso';
import { InsumoModel } from '@Models/Insumo';
import { NbButtonModule, NbCardModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { DetalleTraspasoService, InsumoService } from '@Services';

@Component({
  selector: 'app-detalle-traspasos',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf, NgFor, NbInputModule, NbCardModule, NbButtonModule, NbSelectModule],
  templateUrl: './detalle-traspasos.component.html',
  styleUrls: ['./detalle-traspasos.component.scss']
})
export class DetalleTraspasosComponent implements OnInit{
  private detallesTraspasoService = inject(DetalleTraspasoService)
  private insumoService = inject(InsumoService)
  private route = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  
  detallesList: DetalleTraspasoModel[] = []
  insumosList: InsumoModel[] = []
  idTraspaso: number = 0
  form = this.fb.nonNullable.group({
    id: [0],
    insumo: ["", [Validators.required]],
    cantidadEnviada: [0, [Validators.required]],
    cantidadRecibida: [0, [Validators.required]],
  })

  ngOnInit(): void {
    this.idTraspaso = +this.route.snapshot.paramMap.get("id")!
    this.getDetalles()
    this.getInsumos()
  }

  getDetalles(): void {
    this.detallesTraspasoService.getDetallesTraspaso(this.idTraspaso).subscribe((data) => {
      this.detallesList = data.Response.data
    })
  }

  getInsumos(): void {
    this.insumoService.GetAllInsumos().subscribe((data) => {
      this.insumosList = data.Response.data
    })
  }

  onSubmit(): void {
    const { id, insumo, cantidadEnviada, cantidadRecibida } = this.form.getRawValue()
    const usuarioActualiza = parseInt(localStorage.getItem("idUsuario") ?? "0")
    
    const insertRequest: DetalleTraspasoInsertRequest = {
      idTraspaso: this.idTraspaso,
      insumo: insumo,
      cantidadEnviada: cantidadEnviada,
      usuarioActualiza: usuarioActualiza
    }
    const updateRequest: DetalleTraspasoUpdateRequest = {
      id: id,
      insumo: insumo,
      cantidadEnviada: cantidadEnviada,
      cantidadRecibida: cantidadRecibida,
      usuarioActualiza: usuarioActualiza
    }

    console.log(insertRequest)
    console.log(updateRequest)

    const serviceCall = id == 0 ? this.detallesTraspasoService.insertDetalleTraspaso(insertRequest) : this.detallesTraspasoService.updateDetalleTraspaso(updateRequest)
    serviceCall.subscribe({
      next: (res: any) => {
        console.log(res)
        this.getDetalles()
        this.resetForm() 
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  resetForm(): void {
    this.form.reset({
      id: 0,
      insumo: "",
      cantidadEnviada: 0,
      cantidadRecibida: 0
    })
  }

  editDetalle(data: DetalleTraspasoModel): void {
    const insumo = this.insumosList.find(insumo => insumo.Descripcion.toLowerCase() === data.Insumo.toLowerCase())
    console.log(insumo)
    this.form.patchValue({
      id: data.Id,
      insumo: insumo?.Insumo,
      cantidadEnviada: data.CantidadEnviada,
      cantidadRecibida: data.CatidadRecibida
    })
  }

}
