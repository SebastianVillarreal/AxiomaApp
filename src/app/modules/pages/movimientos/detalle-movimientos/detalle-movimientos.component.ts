import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomTableComponent } from '@Component/Table';
import { DetalleMovimientoInsertRequest, DetalleMovimientoModel, DetalleMovimientoUpdateRequest } from '@Models/DetalleMovimiento';
import { InsumoModel } from '@Models/Insumo';
import { NbButtonModule, NbCardModule, NbInputModule, NbRadioModule, NbSelectModule } from '@nebular/theme';
import { SweetAlertService } from '@Service/SweetAlert';
import { DetalleMovimientoService, InsumoService } from '@Services';

@Component({
  selector: 'app-detalle-movimientos',
  standalone: true,
  imports: [CustomTableComponent, NgIf, NgFor, ReactiveFormsModule, NbInputModule, NbSelectModule, NbCardModule, NbButtonModule, NbRadioModule],
  templateUrl: './detalle-movimientos.component.html',
  styleUrls: ['./detalle-movimientos.component.scss']
})
export class DetalleMovimientosComponent implements OnInit{
  private detalleMovimientoService = inject(DetalleMovimientoService)
  private insumoService = inject(InsumoService)
  private sweetAlertService = inject(SweetAlertService)
  private route = inject(ActivatedRoute)
  private fb = inject(FormBuilder)

  detallesList: DetalleMovimientoModel[] = []
  insumosList : InsumoModel[] = []
  idMovimiento: number = 0

  form = this.fb.nonNullable.group({
    id: [0],
    insumo: ["", [Validators.required]],
    cantidad: [0, [Validators.required]],
    estatus: [1]
  })

  ngOnInit(): void {
    this.idMovimiento = +this.route.snapshot.paramMap.get("id")!
    this.getDetalles()
    this.getInsumos()
  }

  getDetalles(): void {
    this.detalleMovimientoService.getDetallesMovimiento(this.idMovimiento).subscribe((data) => {
      this.detallesList = data.Response.data
      console.log(this.detallesList)
    })
  }

  getInsumos(): void {
    this.insumoService.GetAllInsumos().subscribe((data) => {
      this.insumosList = data.Response.data
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { id, insumo, cantidad, estatus } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: DetalleMovimientoInsertRequest = {
        idMovimiento: this.idMovimiento,
        insumo: insumo,
        cantidad: cantidad,
        usuarioActualiza: usuarioActualiza
      }

      const updateRequest: DetalleMovimientoUpdateRequest = {
        id: id,
        insumo: insumo,
        cantidad: cantidad,
        estatus: estatus,
        usuarioActualiza: usuarioActualiza
      }

      const serviceCall = id == 0 ? this.detalleMovimientoService.insertDetalleMovimiento(insertRequest) : this.detalleMovimientoService.updateDetalleMovimiento(updateRequest)

      serviceCall.subscribe({
        next: (res: any) => {
          this.getDetalles()
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
      insumo: '',
      cantidad: 0,
      estatus: 1
    })
  }

  editDetalle(data: DetalleMovimientoModel): void {
    this.form.patchValue({
      id: data.Id,
      insumo: data.Insumo,
      cantidad: data.Cantidad,
    })
  }

  deleteDetalle(Id: number): void {
    this.sweetAlertService.confirm({
      title: 'Eliminar Detalle Movimiento',
      text: '¿Estás seguro que deseas eliminar este Detalle Movimiento?',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.detalleMovimientoService.deleteDetalleMovimiento(Id).subscribe({
          next: (res: any) => {
            this.getDetalles()
            this.resetForm()
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
    })
  }
}
