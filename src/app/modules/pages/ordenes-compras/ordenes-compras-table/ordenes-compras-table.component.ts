import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';
import { OrdenCompraModel } from '@Models/OrdenCompra';
import { OrdenCompraService } from '@Services';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
  selector: 'app-ordenes-compras-table',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './ordenes-compras-table.component.html',
  styleUrls: ['./ordenes-compras-table.component.scss']
})
export class OrdenesComprasTableComponent implements OnInit {
  private ordenCompraService = inject(OrdenCompraService)
  private sweetAlertService = inject(SweetAlertService)

  ordenesComprasList: OrdenCompraModel[] = []

  ngOnInit(): void {
    this.getOrdenesCompras()
  }
  
  getOrdenesCompras(): void {
    this.ordenCompraService.getOrdenCompra().subscribe((data) =>
      this.ordenesComprasList = data.Response.data
    )
  }

  deleteOrdenCompra(Id: number): void {
    this.sweetAlertService.confirm({
      title: '¿Estás seguro que deseas eliminar esta orden de compra?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordenCompraService.deleteOrdenCompra(Id)
          .subscribe({
            next: (res) => {
              this.getOrdenesCompras();
            },
            error: (err) => {
              console.log(err);
            }
          });
      }
    });
  }
}
