import { Component, inject, OnInit } from '@angular/core';
import { EntradaService } from '@Services';
import { CustomTableComponent } from '@Component/Table';
import { EntradaModel } from '@Models/Entrada';

@Component({
  selector: 'app-entradas-table',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './entradas-table.component.html',
  styleUrls: ['./entradas-table.component.scss']
})
export class EntradasTableComponent implements OnInit {
  private entradasService = inject(EntradaService)

  entradasList : EntradaModel[] = []

  ngOnInit(): void {
    this.getEntradas()
  }

  getEntradas(): void {
    this.entradasService.getEntrada().subscribe((data) => {
      this.entradasList = data.Response.data
    })
  }





}
