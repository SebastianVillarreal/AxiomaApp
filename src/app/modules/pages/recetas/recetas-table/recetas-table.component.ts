import { Component, inject, OnInit, TemplateRef, ViewChild, Optional } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NbCardModule, NbDialogService, NbDialogModule, NbIconModule, NbButtonModule, NbInputModule, NbDialogRef } from '@nebular/theme';
import { CustomTableComponent } from '@Component/Table';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { RecetaService } from '@Services';
import { RecetaModel, RecetaUpdateRequest } from '@Models/Receta';

@Component({
  selector: 'app-recetas-table',
  standalone: true,
  imports: [CustomTableComponent, NbCardModule, NbDialogModule, NbIconModule, NbInputModule,ReactiveFormsModule,NbButtonModule,NgIf],
  templateUrl: './recetas-table.component.html',
  styleUrls: ['./recetas-table.component.scss']
})
export class RecetasTableComponent implements OnInit{
  private recetaService = inject(RecetaService)
  private sweetAlertService = inject(SweetAlertService)
  private router = inject(Router);
  private dialogService = inject(NbDialogService)
  private fb = inject(FormBuilder)
  constructor(@Optional() private dialogRef: NbDialogRef<any>) {}

  recetasList: RecetaModel[] = []

  @ViewChild('dialog') dialog!: TemplateRef<any>

  editMode: boolean = false;

  form = this.fb.nonNullable.group({
    id: [0],
    nombre: ['', [Validators.required]]
  })

  toggleEditMode() {
    this.editMode = !this.editMode
  }
  
  open(dialog: TemplateRef<any>, data:RecetaModel) {
    this.dialogRef=this.dialogService.open(dialog, { context: data });
  }

  ngOnInit(): void {
    this.getRecetas()
  }

  getRecetas(): void {
    this.recetaService.getRecetas().subscribe((data) => {
      this.recetasList = data
    })
  }

  editReceta(data: RecetaModel): void {
    this.open(this.dialog, data);
    this.form.patchValue({
      id: data.Id,
      nombre: data.Nombre
    });
  }

  updateReceta(): void {
    if(this.form.valid){
      const {id, nombre} = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario')??'0')

      const requestUpdate: RecetaUpdateRequest = {
        id: id,
        nombre: nombre.trim(),
        usuarioActualiza: usuarioActualiza
      }

      this.recetaService.updateReceta(requestUpdate).subscribe({
        next: (res: any) => {
          this.resetForm();
          this.getRecetas();
          this.dialogRef.close()
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }

  resetForm(): void {
    this.form.reset({
      id: 0,
      nombre: ''
    }
    )
  } 

  deleteReceta(Id: number): void {
    this.sweetAlertService.confirm({
      title: '¿Estás seguro que deseas eliminar esta receta?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.recetaService.deleteReceta(Id)
          .subscribe({
            next: (res) => {
              this.getRecetas();
            },
            error: (err) => {
              console.log(err);
            }
          });
      }
    });
  }

  showDetallesReceta(data: RecetaModel): void {
    console.log(data);
    this.router.navigate(['pages/recetas/detalles',data.Id],
      {
        queryParams: {nombre: data.Nombre}
      }
    )
  }
}
