import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';
import { ExistenciaModel } from '@Models/Existencia';
import { ExistenciaService } from '@Services';

@Component({
  selector: 'app-existencias',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './existencias.component.html',
  styleUrls: ['./existencias.component.scss']
})
export class ExistenciasComponent implements OnInit{
  private existenciaService = inject(ExistenciaService)

  existenciasList: ExistenciaModel[] = []

  ngOnInit(): void {
    this.getExistencias()
  }

  getExistencias(): void {
    this.existenciaService.getExistencias().subscribe((data) => {
      this.existenciasList = data.Response.data
    })
  }
}
