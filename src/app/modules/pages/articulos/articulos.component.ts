import { Component, inject, OnInit } from '@angular/core';

//Services
import { ArticuloService } from '@Services';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

//Models
import { ArticuloModel } from '@Models/Articulo';


import { CustomTableComponent } from '@Component/Table';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent implements OnInit{
  constructor() { }
  private articulosService = inject(ArticuloService)

  articulosList: ArticuloModel[] = []

  ngOnInit(): void {
    this.getAllArticulos()
  }

  getAllArticulos() {
    this.articulosService.GetAllArticulos().subscribe((data) => {
      this.articulosList = data.Response.data;
    })
  }

  editArticulo(data: ArticuloModel)
  {
    console.log(data)
  }

  deleteArticulo(Id: number) {
    console.log(Id)
  }
}
