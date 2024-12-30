import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';
import { MovimientoModel } from '@Models/Movimiento';
import { SweetAlertService } from '@Service/SweetAlert';
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
  private sweetAlertService = inject(SweetAlertService)

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

  deleteMovimiento(Id: number) {
    this.sweetAlertService.confirm({
      title: 'Eliminar Movimiento',
      text: '¿Estás seguro que deseas eliminar este movimiento?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.movimientoService.deleteMovimiento(Id).subscribe({
          next: (res: any) => {
            this.getMovimientos()
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
    })
  }
}
