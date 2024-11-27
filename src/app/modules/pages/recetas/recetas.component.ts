import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';

import { NbInputModule, NbSelectModule, NbCardModule, NbButtonModule } from '@nebular/theme';

import { RecetaService } from '@Services';
import { RecetaInsertRequest, RecetaInsertResponse, RecetaModel } from '@Models/Receta';
import { data } from 'autoprefixer';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf,NbInputModule, NbSelectModule, NbCardModule, NbButtonModule],
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss']
})
export class RecetasComponent implements OnInit {
  private recetaService = inject(RecetaService)
  private fb = inject(FormBuilder);

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
      console.log(this.recetasList)
    })
  }

  onSubmit(): void {
    if(this.form.valid){
      const {nombre} = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario')??'0')

      const request: RecetaInsertRequest = {
        nombre: nombre,
        usuarioRegistra: usuarioActualiza,
        usuarioActualiza: usuarioActualiza
      }

      const serviceCall = this.recetaService.insertReceta(request)
      serviceCall.subscribe({
        next: (res: RecetaInsertResponse) => {
          this.resetForm()
          this.getRecetas
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

  editReceta(data: RecetaModel): void {
    console.log(data);
  }

  deleteReceta(Id: number): void {
    console.log(Id);
  }
}
