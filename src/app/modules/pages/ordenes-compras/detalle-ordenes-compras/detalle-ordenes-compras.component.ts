import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbSelectModule, NbInputModule } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { DetalleOrdenCompraInsertRequest, DetalleOrdenCompraModel } from '@Models/DetalleOrdenCOmpra';
import { InsumoModel } from '@Models/Insumo';
import { CustomTableComponent } from '@Component/Table';
import { DetalleOrdenCompraService, InsumoService } from '@Services';

@Component({
  selector: 'app-detalle-ordenes-compras',
  standalone: true,
  imports: [ReactiveFormsModule, CustomTableComponent,NgIf, NgFor, NbCardModule, NbButtonModule, NbSelectModule, NbInputModule],
  templateUrl: './detalle-ordenes-compras.component.html',
  styleUrls: ['./detalle-ordenes-compras.component.scss']
})
export class DetalleOrdenesComprasComponent implements OnInit{
  private detalleOrdenCompraService = inject(DetalleOrdenCompraService)
  private insumoService = inject(InsumoService)
  private fb = inject(FormBuilder)
  private route = inject(ActivatedRoute)

  insumosList: InsumoModel[] = []
  detallesOrdenCompraList: DetalleOrdenCompraModel[] = []
  idOrdenCompra: number = 0
  form = this.fb.nonNullable.group({
    id: [0],
    insumo: ['', [Validators.required]],
    cantidad:  [0, [Validators.required]],
  })

  ngOnInit(): void {
    this.idOrdenCompra = +this.route.snapshot.paramMap.get("id")!
    this.getInsumos()
    this.getDetallesOrdenCompra()
  }

  getDetallesOrdenCompra(): void {
    this.detalleOrdenCompraService.getDetalleOrdenCompra(this.idOrdenCompra).subscribe((data) =>{
      this.detallesOrdenCompraList = data.Response.data;
    })
  }

  getInsumos(): void {
    this.insumoService.GetAllInsumos().subscribe((data) => {
      this.insumosList = data.Response.data
    })
  }
  onSubmit(): void {
    if (this.form.valid)
    {
      const {id, insumo, cantidad} = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario')??'0')

      const request: DetalleOrdenCompraInsertRequest = {
        idOrdenCompra: this.idOrdenCompra,
        insumo: insumo,
        cantidad: cantidad,
        usuarioActualiza: usuarioActualiza
      }

      const serviceCall = this.detalleOrdenCompraService.insertDetalleOrdenCompra(request)
      serviceCall.subscribe({
        next: (res: any) => {
          this.resetForm()
          this.getDetallesOrdenCompra()
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }

  resetForm(): void{
    this.form.reset({
      insumo: '',
      cantidad: 0
    })
  }

  editDetalle(data: DetalleOrdenCompraModel): void{
    console.log(data)
  }
  deleteDetalle(Id: number): void{
    console.log(Id)
  }
}
