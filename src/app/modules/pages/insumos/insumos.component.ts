import { Component, inject, OnInit } from '@angular/core';

import { CustomTableComponent } from '@Component/Table';

import { InsumoService } from '@Services';
import { InsumoModel, GetInsumoResponse } from '@Models/Insumo';

@Component({
  selector: 'app-insumos',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss']
})
export class InsumosComponent implements OnInit{
  private insumoService = inject(InsumoService)

  insumosList: InsumoModel[] = []

  ngOnInit(): void {
    this.getInsumos();
  }

  getInsumos() {
    this.insumoService.GetAllInsumos().subscribe((data) => {
      this.insumosList = data.Response.data;
    })
  }

  editInsumo(data: InsumoModel)
  {
    console.log(data)
  }

  deleteInsumo(Id: number)
  {
    console.log(Id)
  }
}
