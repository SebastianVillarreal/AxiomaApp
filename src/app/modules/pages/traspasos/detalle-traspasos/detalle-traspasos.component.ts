import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomTableComponent } from '@Component/Table';
import { DetalleTraspasoModel } from '@Models/DetalleTraspaso';
import { DetalleTraspasoService } from '@Services';

@Component({
  selector: 'app-detalle-traspasos',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './detalle-traspasos.component.html',
  styleUrls: ['./detalle-traspasos.component.scss']
})
export class DetalleTraspasosComponent implements OnInit{
  private detallesTraspasoService = inject(DetalleTraspasoService)
  private route = inject(ActivatedRoute)
  
  detallesList: DetalleTraspasoModel[] = []
  idTraspaso: number = 0

  ngOnInit(): void {
    this.idTraspaso = +this.route.snapshot.paramMap.get("id")!
    this.getDetalles()
  }

  getDetalles(): void {
    this.detallesTraspasoService.getDetallesTraspaso(this.idTraspaso).subscribe((data) => {
      this.detallesList = data.Response.data
    })
  }

}
