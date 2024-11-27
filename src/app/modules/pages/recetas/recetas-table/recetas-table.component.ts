import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';

import { RecetaService } from '@Services';
import { GetRecetaResponse, RecetaModel } from '@Models/Receta';

@Component({
  selector: 'app-recetas-table',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './recetas-table.component.html',
  styleUrls: ['./recetas-table.component.scss']
})
export class RecetasTableComponent implements OnInit{
  private recetaService = inject(RecetaService)
  
  recetasList: RecetaModel[] = []

  ngOnInit(): void {
    this.getRecetas()
  }

  getRecetas(): void {
    this.recetaService.getRecetas().subscribe((data) => {
      this.recetasList = data
    })
  }

  editReceta(data: RecetaModel): void {
    console.log(data);
  }

  deleteReceta(Id: number): void {
    console.log(Id);
  }
}
