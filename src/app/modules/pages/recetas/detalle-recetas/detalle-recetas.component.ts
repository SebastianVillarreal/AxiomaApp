import { Component, inject, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbCardModule, NbInputModule, NbSelectModule, NbButtonModule } from '@nebular/theme';
import { DetallesRecetaInsertRequest } from '@Models/DetalleRecetas';
import { InsumoModel } from '@Models/Insumo';
import { DetalleRecetasService } from '@Services';
import { InsumoService } from '@Services';
import { RecetaService } from '@Services';
import { RecetaModel } from '@Models/Receta';

@Component({
  selector: 'app-detalle-recetas',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor,NbCardModule, NbInputModule, NbSelectModule, NbButtonModule],
  templateUrl: './detalle-recetas.component.html',
  styleUrls: ['./detalle-recetas.component.scss']
})
export class DetalleRecetasComponent implements OnInit{
  @Input() idReceta: number = 0;

  @Output() closeForm: EventEmitter<any> = new EventEmitter();

  private fb = inject(FormBuilder)
  private detalleRecetasService = inject(DetalleRecetasService)
  private insumoService = inject(InsumoService)

  insumosList: InsumoModel[] = []
  recetasList: RecetaModel[] = []

  form = this.fb.nonNullable.group({
    insumo: ['',[Validators.required]],
    cantidad: [0, [Validators.required]],
  })

  ngOnInit(): void {
    this.getInsumos();
  }
  getInsumos() {
    this.insumoService.GetAllInsumos().subscribe((data) =>{
      this.insumosList = data.Response.data
    })
  }

  onSubmit(): void {
    if (this.form.valid){
      const {insumo, cantidad} = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario')??'0')

      const request: DetallesRecetaInsertRequest = {
        idReceta: this.idReceta,
        insumo: insumo,
        cantidad: cantidad,
        usuarioActualiza: usuarioActualiza
      }

      console.log(request)
      const serviceCall = this.detalleRecetasService.insertDetalleReceta(request)
      serviceCall.subscribe({
        next: (res: any) => {
          this.resetForm();

        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }

  resetForm(): void{
    this.form.reset({
      insumo: '',
      cantidad: 0
    })
  }

  closeComponent(): void{
    this.closeForm.emit();
  }
}
