import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomTableComponent } from '@Component/Table';
import { DetalleMovimientoInsertRequest, DetalleMovimientoModel } from '@Models/DetalleMovimiento';
import { InsumoModel } from '@Models/Insumo';
import { NbButtonModule, NbCardModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { DetalleMovimientoService, InsumoService } from '@Services';

@Component({
  selector: 'app-detalle-movimientos',
  standalone: true,
  imports: [CustomTableComponent, NgIf, NgFor, ReactiveFormsModule, NbInputModule, NbSelectModule, NbCardModule, NbButtonModule],
  templateUrl: './detalle-movimientos.component.html',
  styleUrls: ['./detalle-movimientos.component.scss']
})
export class DetalleMovimientosComponent implements OnInit{
  private detalleMovimientoService = inject(DetalleMovimientoService)
  private insumoService = inject(InsumoService)
  private route = inject(ActivatedRoute)
  private fb = inject(FormBuilder)

  detallesList: DetalleMovimientoModel[] = []
  insumosList : InsumoModel[] = []
  idMovimiento: number = 0

  form = this.fb.nonNullable.group({
    insumo: ["", [Validators.required]],
    cantidad: [0, [Validators.required]]
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
      const { insumo, cantidad } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: DetalleMovimientoInsertRequest = {
        idMovimiento: this.idMovimiento,
        insumo: insumo,
        cantidad: cantidad,
        usuarioActualiza: usuarioActualiza
      }

      const serviceCall = this.detalleMovimientoService.insertDetalleMovimiento(insertRequest)

      serviceCall.subscribe({
        next: (res: any) => {
          this.getDetalles()
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
      insumo: '',
      cantidad: 0
    })
  }
}
