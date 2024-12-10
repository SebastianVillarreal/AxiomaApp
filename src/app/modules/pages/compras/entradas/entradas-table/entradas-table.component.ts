import { Component, inject, OnInit } from '@angular/core';
import { EntradaService } from '@Services';
import { CustomTableComponent } from '@Component/Table';
import { EntradaModel } from '@Models/Entrada';
import { SweetAlertService } from '@Service/SweetAlert';

@Component({
  selector: 'app-entradas-table',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './entradas-table.component.html',
  styleUrls: ['./entradas-table.component.scss']
})
export class EntradasTableComponent implements OnInit {
  private entradasService = inject(EntradaService)
  private sweetAlertService = inject(SweetAlertService)

  entradasList : EntradaModel[] = []

  ngOnInit(): void {
    this.getEntradas()
  }

  getEntradas(): void {
    this.entradasService.getEntrada().subscribe((data) => {
      this.entradasList = data.Response.data
    })
  }

  deleteEntrada(Id: number): void {
    this.sweetAlertService.confirm({
      title: '¿Estás seguro que deseas eliminar esta entrada?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entradasService.deleteEntrada(Id)
          .subscribe({
            next: (res) => {
              this.getEntradas();
            },
            error: (err) => {
              console.log(err);
            }
          });
      }
    });
  }





}
