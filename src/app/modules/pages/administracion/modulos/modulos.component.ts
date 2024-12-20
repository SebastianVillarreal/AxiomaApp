import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';
import { ModuloModel } from '@Models/Modulo';
import { ModuloService } from '@Services';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})
export class ModulosComponent implements OnInit{
  private moduloService = inject(ModuloService)

  modulosList: ModuloModel[] = []

  ngOnInit(): void {
    this.getModulos()
  }

  getModulos(): void {
    this.moduloService.getModulos().subscribe((data) => {
      this.modulosList = data.Response.data
    })
  }
}
