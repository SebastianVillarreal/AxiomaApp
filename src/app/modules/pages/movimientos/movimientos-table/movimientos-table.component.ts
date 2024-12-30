import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';
import { MovimientoModel } from '@Models/Movimiento';
import { MovimientoService } from '@Services';

@Component({
  selector: 'app-movimientos-table',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './movimientos-table.component.html',
  styleUrls: ['./movimientos-table.component.scss']
})
export class MovimientosTableComponent implements OnInit {
  private movimientoService = inject(MovimientoService)

  movimientosList: MovimientoModel[] = []

  ngOnInit(): void {
    this.getMovimientos()
  }

  getMovimientos(): void {
    this.movimientoService.getMovimientos().subscribe((data) => {
      this.movimientosList = data.Response.data.Movimientos
    })
  }

  exportMovimientos(): void {
    this.movimientoService.exportMovimientos().subscribe((data) => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Movimientos.xlsx';
      a.click();
    },
      error => {
      console.log(error)
    })
  }
}
