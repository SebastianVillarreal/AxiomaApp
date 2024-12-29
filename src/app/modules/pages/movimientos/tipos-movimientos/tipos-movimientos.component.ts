import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';
import { TipoMovimientoModel } from '@Models/TipoMovimiento';
import { TipoMovimientoService } from '@Services';

@Component({
  selector: 'app-tipos-movimientos',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './tipos-movimientos.component.html',
  styleUrls: ['./tipos-movimientos.component.scss']
})
export class TiposMovimientosComponent implements OnInit{
  private tiposService = inject(TipoMovimientoService)

  tiposList: TipoMovimientoModel[] = []

  ngOnInit(): void {
    this.getTipos()
  }

  getTipos(): void {
    this.tiposService.getTiposMovimiento().subscribe((data) => {
      this.tiposList = data
    })
  }
}
