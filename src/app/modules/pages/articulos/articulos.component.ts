import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NbActionComponent, NbCardModule, NbInputModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

//Services
import { ArticuloService } from '@Services';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

//Models
import { ArticuloInsertRequest, ArticuloModel, ArticuloUpdateRequest } from '@Models/Articulo';


import { CustomTableComponent } from '@Component/Table';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [CustomTableComponent, NbCardModule, NbInputModule, NbButtonModule, ReactiveFormsModule, NbSelectModule,NgIf, NgFor],
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent implements OnInit{
  constructor() { }
  private fb = inject(FormBuilder)
  private articulosService = inject(ArticuloService)
  private sweetAlertService = inject(SweetAlertService)

  articulosList: ArticuloModel[] = []
  familiasList = [
    { id: 1, nombre: '1' },
  ];
  unidadesMedidaList = [
    { id: 1, nombre: 'Kilogramo' },
    { id: 2, nombre: 'Gramo' },
    { id: 3, nombre: 'Paquete' },
    { id: 4, nombre: 'Pieza' },
    { id: 5, nombre: 'Litro' },
    { id: 6, nombre: 'Mililitro' },
    { id: 7, nombre: 'Metro' },
    { id: 8, nombre: 'Centímetro' },
  ];
  

  form = this.fb.nonNullable.group({
    id: [0],
    codigo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    idFamilia: [0, [Validators.required, Validators.min(1)]],
    idUm: [0, [Validators.required, Validators.min(1)]],
    ultimoCosto: [0, [Validators.required]],
    precioVenta: [0, Validators.required],
    iva: [0, [Validators.required]],
    ieps: [0, [Validators.required]]
  })

  ngOnInit(): void {
    this.getAllArticulos()
  }

  getAllArticulos() {
    this.articulosService.GetAllArticulos().subscribe((data) => {
      this.articulosList = data.Response.data;
    })
  }

  onSubmit(): void{
    if (this.form.valid) {
      const { id, codigo, descripcion, idFamilia, idUm, ultimoCosto, precioVenta, iva, ieps } = this.form.getRawValue();
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario')??'0')

      const request: ArticuloInsertRequest = {
        codigo: codigo,
        descripcion: descripcion,
        idFamilia: idFamilia,
        idUM: idUm,
        ultimoCosto: ultimoCosto,
        precioVenta: precioVenta,
        iva: iva,
        ieps: ieps,
        idUsuario: usuarioActualiza
      }

      const requestUpdate: ArticuloUpdateRequest = {
        id: id,
        codigo: codigo,
        descripcion: descripcion,
        idFamilia: idFamilia,
        idUM: idUm,
        ultimoCosto: ultimoCosto,
        precioVenta: precioVenta,
        iva: iva,
        ieps: ieps,
        idUsuario: usuarioActualiza
      }

      const serviceCall = id == 0 ? this.articulosService.InsertArticulo(request) : this.articulosService.UpdateArticulo(requestUpdate)
      serviceCall.subscribe({
        next: (res: any) => {
          this.resetForm();
          this.getAllArticulos();
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }

  resetForm(): void{
    this.form.reset({
      id: 0,
      codigo: '',
      descripcion: '',
      idFamilia: 0,
      idUm: 0,
      ultimoCosto: 0,
      precioVenta: 0,
      iva: 0,
      ieps: 0
    })
  }

  editArticulo(data: ArticuloModel)
  {
    const idFamilia = this.familiasList.find(familia => familia.nombre === data.Familia);
    const umSeleccionada = this.unidadesMedidaList.find(um => um.nombre.toLowerCase() === data.UM.toLowerCase());

    this.form.patchValue({
      id: data.Id,
      codigo: data.Codigo,
      descripcion: data.Descripcion,
      idFamilia: idFamilia?.id,
      idUm: umSeleccionada?.id,
      ultimoCosto: Number(data.UltimoCosto),
      precioVenta: Number(data.PrecioVenta),
      iva: Number(data.Iva),
      ieps: Number(data.Ieps)
    })
  }

  deleteArticulo(Id: number) {
    this.sweetAlertService.confirm({
      title: '¿Estás seguro que deseas eliminar este artículo?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.articulosService.DeleteArticulo(Id)
          .subscribe({
            next: (res) => {
              this.getAllArticulos();
            },
            error: (err) => {
              console.log(err);
            }
          });
      }
    });
  }
  
}
