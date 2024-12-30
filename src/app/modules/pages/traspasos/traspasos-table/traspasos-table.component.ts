import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { SucursalModel } from '@Models/Sucursal';
import { TraspasoAuthorizeRequest, TraspasoGetRequest, TraspasoModel, TraspasoUpdateRequest } from '@Models/Traspaso';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbDialogRef, NbDialogService, NbInputModule, NbRadioModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { DetalleTraspasoService, SucursalService, TraspasoService, UsuarioService } from '@Services';
import { DatePipe } from '@angular/common';
import { SweetAlertService } from '@Service/SweetAlert';
import { UsuarioModel } from '@Models/Usuario';
import { Router } from '@angular/router';
import { DetalleTraspasoExportRequest } from '@Models/DetalleTraspaso';

@Component({
  selector: 'app-traspasos-table',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf, NgFor, NbDatepickerModule, NbCardModule,NbSelectModule, NbButtonModule, NbInputModule, NbDialogModule, NbTabsetModule, NbRadioModule],
  templateUrl: './traspasos-table.component.html',
  styleUrls: ['./traspasos-table.component.scss']
})
export class TraspasosTableComponent implements OnInit {
  private traspasoService = inject(TraspasoService)
  private sucursalService = inject(SucursalService)
  private detalleTraspasoService = inject(DetalleTraspasoService)
  private sweetAlertService = inject(SweetAlertService)
  private dialogService = inject(NbDialogService)
  private usuarioService = inject(UsuarioService)
  private datePipe = inject(DatePipe)
  private fb = inject(FormBuilder)
  private router = inject(Router)

  constructor(@Optional() private dialogRef: NbDialogRef<any>) { }
  @ViewChild('dialog') dialog!: TemplateRef<any>
  
  traspasoList: TraspasoModel[] = []
  sucursalesList: SucursalModel[] = []
  usuariosList: UsuarioModel[] = []
  filter = this.fb.nonNullable.group({
    pAlmacenOrigen: [0, [Validators.required, Validators.min(1)]],
    pAlmacenDestino: [0, [Validators.required, Validators.min(1)]],
    pFechaInicio: ["", [Validators.required]],
    pFechaFinal: ["", [Validators.required]]
  })
  form = this.fb.nonNullable.group({
    id: [0],
    idAlmacenOrigen: [0, [Validators.required, Validators.min(1)]],
    idAlmacenDestino: [0, [Validators.required, Validators.min(1)]],
    usuarioEnvia: [0, [Validators.required, Validators.min(1)]]
  })
  authorize = this.fb.nonNullable.group({
    id: [0],
    fechaRecibido: ["", [Validators.required]],
    estatus: [1],
    usuarioRecibe: [0, [Validators.required, Validators.min(1)]],
  })
  
  ngOnInit(): void {
    this.getSucursales()
    this.getUsuarios()
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

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuariosList = data
    })
  }

  onSubmit(): void {
    const { id,idAlmacenOrigen, idAlmacenDestino, usuarioEnvia } = this.form.getRawValue()
    const usuarioActualiza = parseInt(localStorage.getItem("idUsuario") ?? "0")
    
    const updateRequest: TraspasoUpdateRequest = {
      id: id,
      idAlmacenOrigen: idAlmacenOrigen,
      idAlmacenDestino: idAlmacenDestino,
      usuarioEnvia: usuarioEnvia,
      usuarioActualiza: usuarioActualiza
    }

    this.traspasoService.updateTraspaso(updateRequest).subscribe({
      next: (res: any) => {
        console.log(res)
        this.dialogRef.close()
        this.getTraspasos()
        this.resetForms()
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  onAuthorize(): void {
    const { id, fechaRecibido, usuarioRecibe, estatus } = this.authorize.getRawValue()
    const usuarioActualiza = parseInt(localStorage.getItem("idUsuario") ?? "0")

    const authorizeRequest: TraspasoAuthorizeRequest = {
      id: id,
      fechaRecibido: this.datePipe.transform(fechaRecibido, 'MM/dd/yyyy')??'',
      usuarioRecibe: usuarioRecibe,
      estatus: estatus,
      usuarioActualiza: usuarioActualiza
    }
    console.log(authorizeRequest)

    this.traspasoService.authorizeTraspaso(authorizeRequest).subscribe({
      next: (res: any) => {
        console.log(res)
        this.dialogRef.close()
        this.getTraspasos()
        this.resetForms()
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }

  resetFilter(): void {
    this.filter.reset({
      pAlmacenOrigen: 0,
      pAlmacenDestino: 0,
      pFechaInicio: '',
      pFechaFinal: ''
    })
  }

  resetForms(): void {
    this.authorize.reset(
      {
        id: 0,
        fechaRecibido: '',
        usuarioRecibe: 0,
        estatus: 0,
      }
    )

    this.form.reset({
      id: 0,
      usuarioEnvia: 0,
      idAlmacenOrigen: 0,
      idAlmacenDestino: 0
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

  editTraspaso(data: TraspasoModel) {
    this.dialogRef = this.dialogService.open(this.dialog, { context: data })
    const almacenOrigen = this.sucursalesList.find(sucursal => sucursal.Nombre === data.AlmacenOrigen)
    const almacenDestino = this.sucursalesList.find(sucursal => sucursal.Nombre === data.AlmacenDestino)
    const usuarioEnvia = this.usuariosList.find(usuario => usuario.Nombre === data.UsuarioEnvia)
    const usuarioRecibe = this.usuariosList.find(usuario => usuario.Nombre === data.UsuarioRecibe)

    this.form.patchValue({
      id: data.Id,
      idAlmacenOrigen: almacenOrigen?.Id,
      idAlmacenDestino: almacenDestino?.Id,
      usuarioEnvia: usuarioEnvia?.Id
    })
    this.authorize.patchValue({
      id: data.Id,
      usuarioRecibe: usuarioRecibe?.Id,
    })
  }

  showDetails(data: TraspasoModel): void {
    this.router.navigate(['pages/traspasos/detalles', data.Id])
  }

  exportDiferenciaDetallesTraspasos(): void {
    const { pFechaInicio, pFechaFinal } = this.filter.getRawValue()
    const filter: DetalleTraspasoExportRequest = {
      FechaInicio: this.datePipe.transform(pFechaInicio, 'MM/dd/yyyy') ?? '',
      FechaFin: this.datePipe.transform(pFechaFinal, 'MM/dd/yyyy') ?? '',
    }

    this.detalleTraspasoService.exportDiferenciasTraspaso(filter).subscribe((data) => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'DiferenciaEntreTraspasos.xlsx';
      a.click();
    },
      error => {
      console.log(error)
    })
  }

  
}
