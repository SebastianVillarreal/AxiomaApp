import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { DetalleRecetasComponent } from '../detalle-recetas/detalle-recetas.component';

import {trigger, transition, style, animate} from '@angular/animations';

import { NbInputModule, NbSelectModule, NbCardModule, NbButtonModule } from '@nebular/theme';

import { RecetaService } from '@Services';
import { RecetaInsertRequest, RecetaModel } from '@Models/Receta';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,NbInputModule, NbSelectModule, NbCardModule, NbButtonModule, DetalleRecetasComponent],
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('500ms ease-in', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class RecetasComponent implements OnInit {
  private recetaService = inject(RecetaService)
  private fb = inject(FormBuilder);

  showDetalles = false;
  idReceta = 0;
  nombreReceta = '';

  recetasList: RecetaModel[] = []
  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
  })

  ngOnInit(): void {
    this.getRecetas()
  }

  getRecetas(): void {
    this.recetaService.getRecetas().subscribe((data) => {
      this.recetasList = data
    })
  }

  onSubmit(): void {
    if(this.form.valid){
      const {nombre} = this.form.getRawValue()
      this.nombreReceta = nombre;
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario')??'0')

      const request: RecetaInsertRequest = {
        nombre: nombre,
        usuarioRegistra: usuarioActualiza,
        usuarioActualiza: usuarioActualiza
      }

      const serviceCall = this.recetaService.insertReceta(request)
      serviceCall.subscribe({
        next: (res: any) => {
          this.resetForm()
          this.getRecetas()
          this.showDetalles = true;
          this.idReceta = res.response.data;
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }

  resetForm(): void{
    this.form.reset(
      {
        nombre: ''
      }
    )
  }



  hideDetalleRecetas(): void{
    this.showDetalles = false;
  }
}
