import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomTableComponent } from '@Component/Table';
import { DetalleMovimientoModel } from '@Models/DetalleMovimiento';
import { DetalleMovimientoService } from '@Services';

@Component({
  selector: 'app-detalle-movimientos',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './detalle-movimientos.component.html',
  styleUrls: ['./detalle-movimientos.component.scss']
})
export class DetalleMovimientosComponent implements OnInit{
  private detalleMovimientoService = inject(DetalleMovimientoService)
  private route = inject(ActivatedRoute)

  detallesList: DetalleMovimientoModel[] = []
  idMovimiento: number = 0


  ngOnInit(): void {
    this.idMovimiento = +this.route.snapshot.paramMap.get("id")!
    this.getDetalles()
  }

  getDetalles(): void {
    this.detalleMovimientoService.getDetallesMovimiento(this.idMovimiento).subscribe((data) => {
      this.detallesList = data.Response.data
      console.log(this.detallesList)
    })
  }
}
