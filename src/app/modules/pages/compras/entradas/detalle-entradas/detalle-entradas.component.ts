import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticuloModel } from '@Models/Articulo';
import { DetalleEntradaInsertRequest } from '@Models/DetalleEntrada';
import { NbButtonModule, NbCardModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { ArticuloService, DetalleEntradaService } from '@Services';

@Component({
  selector:'app-detalle-entradas',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, NbCardModule, NbInputModule, NbSelectModule, NbButtonModule],
  templateUrl: './detalle-entradas.component.html',
  styleUrls: ['./detalle-entradas.component.scss']
})
export class DetalleEntradasComponent implements OnInit {
  private detalleEntradaService = inject(DetalleEntradaService)
  private articuloService = inject(ArticuloService)
  private fb = inject(FormBuilder)
  private route = inject(ActivatedRoute)

  articulosList: ArticuloModel[] = []
  idEntrada: number = 0
  form = this.fb.nonNullable.group({
    codigo: ['', [Validators.required]],
    cantidad: [0, [Validators.required]],
    costo: [0, [Validators.required]],
    descuento: [0, [Validators.required]],
  })

  ngOnInit(): void {
    this.idEntrada = +this.route.snapshot.paramMap.get("id")!
    this.getArticulos()
  }

  getArticulos(): void {
    this.articuloService.GetAllArticulos().subscribe((data) => {
      this.articulosList = data.Response.data
    })
  }

  onSubmit(): void {
    if (this.form.valid)
    {
      const { codigo, cantidad, costo, descuento } = this.form.getRawValue()
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
}
