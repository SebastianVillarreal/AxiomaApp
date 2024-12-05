import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';
import { OrdenCompraModel } from '@Models/OrdenCompra';
import { OrdenCompraService } from '@Services';

@Component({
  selector: 'app-ordenes-compras-table',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './ordenes-compras-table.component.html',
  styleUrls: ['./ordenes-compras-table.component.scss']
})
export class OrdenesComprasTableComponent implements OnInit {
  private ordenCompraService = inject(OrdenCompraService)

  ordenesComprasList: OrdenCompraModel[] = []

  ngOnInit(): void {
    this.getOrdenesCompras()
  }
  
  getOrdenesCompras(): void {
    this.ordenCompraService.getOrdenCompra().subscribe((data) =>
      this.ordenesComprasList = data.Response.data
    )
  }
}
