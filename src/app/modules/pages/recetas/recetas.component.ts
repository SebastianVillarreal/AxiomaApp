import { Component, inject, OnInit } from '@angular/core';

import { CustomTableComponent } from '@Component/Table';

import { RecetaService } from '@Services';
import { RecetaModel } from '@Models/Receta';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss']
})
export class RecetasComponent implements OnInit {
  private recetaService = inject(RecetaService)

  constructor() {}
  recetasList: RecetaModel[] = []

  ngOnInit(): void {
    this.getRecetas()
  }

  getRecetas(): void {
    this.recetaService.getRecetas().subscribe((data) => {
      this.recetasList = data
      console.log(this.recetasList)
    })
  }

  editReceta(data: RecetaModel): void {
    console.log(data);
  }

  deleteReceta(Id: number): void {
    console.log(Id);
  }
}
