import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';
import { CatModuloModel } from '@Models/CatModulo';
import { CatModuloService } from '@Services';

@Component({
  selector: 'app-cat-modulos',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './cat-modulos.component.html',
  styleUrls: ['./cat-modulos.component.scss']
})
export class CatModulosComponent implements OnInit{
  private categoriaService = inject(CatModuloService)

  categoriasList: CatModuloModel[] = []

  ngOnInit(): void {
    this.getCategorias()
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categoriasList = data.Response.data
    })
  }

}
