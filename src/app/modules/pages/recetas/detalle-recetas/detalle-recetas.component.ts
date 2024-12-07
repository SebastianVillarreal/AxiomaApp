import { Component, inject, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NgIf, NgFor, Location } from '@angular/common';
import { CustomTableComponent } from '@Component/Table';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbCardModule, NbInputModule, NbSelectModule, NbButtonModule } from '@nebular/theme';
import { DetalleRecetasModel, DetallesRecetaInsertRequest } from '@Models/DetalleRecetas';
import { InsumoModel } from '@Models/Insumo';
import { DetalleRecetasService } from '@Services';
import { InsumoService } from '@Services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-recetas',
  standalone: true,
  imports: [ReactiveFormsModule, CustomTableComponent,NgIf, NgFor,NbCardModule, NbInputModule, NbSelectModule, NbButtonModule],
  templateUrl: './detalle-recetas.component.html',
  styleUrls: ['./detalle-recetas.component.scss']
})
export class DetalleRecetasComponent implements OnInit{
  @Input() idReceta: number = 0;
  @Input() nombreReceta: string = 'Receta';


  @Output() closeForm: EventEmitter<any> = new EventEmitter();

  private fb = inject(FormBuilder)
  private detalleRecetasService = inject(DetalleRecetasService)
  private insumoService = inject(InsumoService)
  private route = inject(ActivatedRoute)
  private location = inject(Location)

  insumosList: InsumoModel[] = []
  detalleRecetasList: DetalleRecetasModel[] = []

  form = this.fb.nonNullable.group({
    insumo: ['',[Validators.required]],
    cantidad: [0, [Validators.required]],
  })

  ngOnInit(): void {
    this.idReceta = +this.route.snapshot.paramMap.get('id')!
    this.nombreReceta = this.route.snapshot.queryParamMap.get('nombre')!
    this.getInsumos();
    this.getDetallesRecetas();
  }

  getDetallesRecetas(){
    this.detalleRecetasService.getDetalleReceta(this.idReceta).subscribe((data) => {
      this.detalleRecetasList = data.Response.data
    })
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
          this.getDetallesRecetas();
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
    this.location.back()
  }
}
