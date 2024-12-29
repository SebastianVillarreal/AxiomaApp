import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { SucursalModel } from '@Models/Sucursal';
import { TraspasoGetRequest, TraspasoModel } from '@Models/Traspaso';
import { NbButtonModule, NbDatepickerModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { SucursalService, TraspasoService } from '@Services';
import { DatePipe } from '@angular/common';
import { SweetAlertService } from '@Service/SweetAlert';

@Component({
  selector: 'app-traspasos-table',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf, NgFor, NbDatepickerModule, NbSelectModule, NbButtonModule, NbInputModule],
  templateUrl: './traspasos-table.component.html',
  styleUrls: ['./traspasos-table.component.scss']
})
export class TraspasosTableComponent implements OnInit {
  private traspasoService = inject(TraspasoService)
  private sucursalService = inject(SucursalService)
  private sweetAlertService = inject(SweetAlertService)
  private datePipe = inject(DatePipe)
  private fb = inject(FormBuilder)
  
  traspasoList: TraspasoModel[] = []
  sucursalesList: SucursalModel[] = []
  filter = this.fb.nonNullable.group({
    pAlmacenOrigen: [0, [Validators.required, Validators.min(1)]],
    pAlmacenDestino: [0, [Validators.required, Validators.min(1)]],
    pFechaInicio: ["", [Validators.required]],
    pFechaFinal: ["", [Validators.required]]
  })
  
  ngOnInit(): void {
    this.getSucursales()
  }

  getTraspasos(): void {
    const { pAlmacenOrigen, pAlmacenDestino, pFechaInicio, pFechaFinal } = this.filter.getRawValue()
    const filterRequest: TraspasoGetRequest = {
      pAlmacenOrigen: pAlmacenOrigen,
      pAlmacenDestino: pAlmacenDestino,
      pFechaInicio: this.datePipe.transform(pFechaInicio, 'MM/dd/yyyy')??'',
      pFechaFinal: this.datePipe.transform(pFechaFinal, 'MM/dd/yyyy')??''
    }    
    this.traspasoService.getTraspasos(filterRequest).subscribe((data) => {
      this.traspasoList = data
    })
  }

  getSucursales(): void {
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursalesList = data
    })
  }

  resetForm(): void {
    this.filter.reset({
      pAlmacenOrigen: 0,
      pAlmacenDestino: 0,
      pFechaInicio: '',
      pFechaFinal: ''
    })
  }

  deleteTraspaso(Id: number): void {
    this.sweetAlertService.confirm({
      title: 'Eliminar Traspaso',
      text: '¿Estás seguro que desea eliminar este traspaso?',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.traspasoService.deleteTraspaso(Id).subscribe({
          next: (res: any) => {
            this.getTraspasos()
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
    })
  }
}
