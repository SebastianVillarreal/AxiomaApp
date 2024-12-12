import { NgFor, NgIf,Location } from '@angular/common';
import { Component, inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomTableComponent } from '@Component/Table';
import { ArticuloModel } from '@Models/Articulo';
import { DetalleEntradaInsertRequest, DetalleEntradaModel, DetalleEntradaUpdateRequest } from '@Models/DetalleEntrada';
import { NbButtonModule, NbCardModule, NbDialogRef, NbDialogService, NbInputModule, NbSelectModule } from '@nebular/theme';
import { SweetAlertService } from '@Service/SweetAlert';
import { ArticuloService, DetalleEntradaService } from '@Services';

@Component({
  selector:'app-detalle-entradas',
  standalone: true,
  imports: [ReactiveFormsModule, CustomTableComponent,NgIf, NgFor, NbCardModule, NbInputModule, NbSelectModule, NbButtonModule],
  templateUrl: './detalle-entradas.component.html',
  styleUrls: ['./detalle-entradas.component.scss']
})
export class DetalleEntradasComponent implements OnInit {
  private detalleEntradaService = inject(DetalleEntradaService)
  private articuloService = inject(ArticuloService)
  private fb = inject(FormBuilder)
  private route = inject(ActivatedRoute)
  private location = inject(Location)
  private sweetAlertService = inject(SweetAlertService)
  private dialogService = inject(NbDialogService)


  constructor(@Optional() private dialogRef: NbDialogRef<any>){}

  detallesList: DetalleEntradaModel[] = []
  articulosList: ArticuloModel[] = []

  @ViewChild('dialog') dialog!: TemplateRef<any>
  idEntrada: number = 0
  form = this.fb.nonNullable.group({
    codigo: ['', [Validators.required]],
    cantidad: [0, [Validators.required]],
    costo: [0, [Validators.required]],
    descuento: [0, [Validators.required]],
  })

  formCantidad = this.fb.nonNullable.group({
    id: [0],
    cantidad: [0]
  })

  ngOnInit(): void {
    this.idEntrada = +this.route.snapshot.paramMap.get("id")!
    this.getArticulos()
    this.getDetalles()
  }

  getDetalles(): void {
    this.detalleEntradaService.getDetalleEntrada(this.idEntrada).subscribe((data) => {
      this.detallesList = data.Response.data
    })
  }

  getArticulos(): void {
    this.articuloService.GetAllArticulos().subscribe((data) => {
      this.articulosList = data.Response.data
    })
  }

  onSubmit(): void {
    if (this.form.valid)
    {
      const {codigo, cantidad, costo, descuento } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const request: DetalleEntradaInsertRequest = {
        idEntrada: this.idEntrada,
        codigo: codigo,
        cantidad: cantidad,
        costo: costo,
        descuento: descuento,
        usuarioActualiza: usuarioActualiza
      }


      const serviceCall = this.detalleEntradaService.insertDetalleEntrada(request)
      serviceCall.subscribe({
        next: (res: any) => {
          this.resetForm()
          this.getDetalles()
        }
      })
    }
  }

  resetForm(): void{
    this.form.reset({
      codigo: '',
      cantidad: 0,
      costo: 0,
      descuento: 0
    }
    )
  }

  deleteDetalle(Id: number): void {
    this.sweetAlertService.confirm({
      title: '¿Estás seguro que deseas eliminar este detalle de entrada?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.detalleEntradaService.deleteDetalleEntrada(Id)
          .subscribe({
            next: (res) => {
              this.getDetalles();
            },
            error: (err) => {
              console.log(err);
            }
          });
      }
    });
  }

  open(dialog: TemplateRef<any>, data:DetalleEntradaModel) {
    this.dialogRef = this.dialogService.open(dialog, {context: data})
  }

  updateCantidad(): void {
    if (this.formCantidad.valid) {
      const { id, cantidad } = this.formCantidad.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')

      const requestUpdate: DetalleEntradaUpdateRequest = {
        id: id,
        cantidad: cantidad
      }

      this.detalleEntradaService.updateCantidad(requestUpdate).subscribe({
        next: (res) => {
          this.getDetalles();
          this.dialogRef.close()
        },
        error: (err: any) => {
          console.error(err)
        }
      })
    }
  }

  editDetalle(data: DetalleEntradaModel): void {
    this.formCantidad.patchValue({
      id: data.Id,
      cantidad: data.CantidadSinCargo,
    })
    this.open(this.dialog, data)
  }

  closeComponent(): void {
    this.location.back()
  }
}
