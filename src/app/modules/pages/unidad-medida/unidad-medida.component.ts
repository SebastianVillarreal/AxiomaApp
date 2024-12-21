import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';
import { UnidadMedidaModel } from '@Models/UnidadMedida';
import { UnidadMedidaService } from '@Services';

@Component({
  selector: 'app-unidad-medida',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './unidad-medida.component.html',
  styleUrls: ['./unidad-medida.component.scss']
})
export class UnidadMedidaComponent implements OnInit{
  private unidadMedidaService = inject(UnidadMedidaService)

  unidadesMedidasList: UnidadMedidaModel[] = []

  ngOnInit(): void {
    this.getUnidadesMedida()
  }

  getUnidadesMedida(): void {
    this.unidadMedidaService.getUnidadesMedidas().subscribe((data) => {
      this.unidadesMedidasList = data
    })
  }

}
