import { NgIf } from '@angular/common';
import { Component, inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { UsuarioModel, UsuarioUpdateRequest } from '@Models/Usuario';
import { NbButtonModule, NbCardModule, NbDialogModule, NbDialogRef, NbDialogService, NbFormFieldModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { SweetAlertService } from '@Service/SweetAlert';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf,NbInputModule, NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit{
  private usuarioService = inject(UsuarioService)
  private sweetAlertService = inject(SweetAlertService)
  private dialogService = inject(NbDialogService)
  private fb = inject(FormBuilder)

  constructor(@Optional() private dialogRef: NbDialogRef<any>) {}

  usuariosList: UsuarioModel[] = []

  @ViewChild('dialog') dialog!: TemplateRef<any>

  form = this.fb.nonNullable.group({
    id: [0],
    contrasena: ['', [Validators.required]],
  })

  showPassword = false
  ngOnInit(): void {
    this.getUsuarios()
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuariosList = data
      console.log(this.usuariosList)
    })
  }

  getInputType(): string {
    if (this.showPassword) {
      return 'Text'
    }
    else {
      return 'Password'
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword
  }

  open(dialog: TemplateRef<any>, data: UsuarioModel): void {
    this.dialogRef=this.dialogService.open(dialog, {context: data})
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { id, contrasena } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const updateRequest: UsuarioUpdateRequest = {
        id: id,
        contrasena: contrasena,
        usuario: usuarioActualiza
      }

      this.usuarioService.updateUsuarios(updateRequest).subscribe({
        next: (res: any) => {
          console.log(res)
          this.getUsuarios()
          this.resetForm()
          this.dialogRef.close()
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }

  resetForm(): void {
    this.form.reset({
      id: 0,
      contrasena: ''
    })
  }

  editUsuario(data: UsuarioModel): void {
    this.open(this.dialog, data)
    this.form.patchValue({
      id: data.Id,
      contrasena: data.Contrasena
    })
  }

  deleteUsuario(Id: number): void {
    this.sweetAlertService.confirm({
      title: 'Eliminar usuario',
      text: '¿Estás seguro que desea eliminar este usuario?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(Id).subscribe({
          next: (res: any) => {
            console.log(res)
            this.getUsuarios()
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      }
    })
  }
}
