import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { CustomTableComponent } from '@Component/Table';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { RecetaService } from '@Services';
import { RecetaModel } from '@Models/Receta';

@Component({
  selector: 'app-recetas-table',
  standalone: true,
  imports: [CustomTableComponent, NgIf],
  templateUrl: './recetas-table.component.html',
  styleUrls: ['./recetas-table.component.scss']
})
export class RecetasTableComponent implements OnInit{
  private recetaService = inject(RecetaService)
  private sweetAlertService = inject(SweetAlertService)
  
  recetasList: RecetaModel[] = []

  showDetalles = false;
  showForm = false;

  

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
    this.sweetAlertService.confirm({
      title: '¿Estás seguro que deseas eliminar esta receta?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.recetaService.deleteReceta(Id)
          .subscribe({
            next: (res) => {
              this.getRecetas();
            },
            error: (err) => {
              console.log(err);
            }
          });
      }
    });
  }

  showDetallesReceta(data: RecetaModel): void {
    console.log(data);
  }
}
