import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { PersonaInsertRequest, PersonaModel, PersonaUpdateRequest } from '@Models/Persona';
import { SucursalModel } from '@Models/Sucursal';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { SweetAlertService } from '@Service/SweetAlert';
import { PersonaService, SucursalService } from '@Services';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf, NgFor,NbCardModule, NbInputModule, NbButtonModule, NbFormFieldModule, NbIconModule, NbSelectModule],
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {
  private personaService = inject(PersonaService)
  private sucursalService = inject(SucursalService)
  private sweetAlertService = inject(SweetAlertService)
  private fb = inject(FormBuilder)

  showPassword = false
  editMode = false

  personasList: PersonaModel[] = []
  sucursalesList: SucursalModel[] = []
  form = this.fb.nonNullable.group({
    id: [0],
    sucursal: [0],
    nombre: ['', [Validators.required]],
    apPaterno: ['', [Validators.required]],
    apMaterno: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    pass: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.getPersonas()
    this.getSucursales()
  }

  getPersonas(): void {
    this.personaService.getPersonas().subscribe((data) => {
      this.personasList = data.Response.data
    })
  }

  getSucursales(): void {
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursalesList = data
    })
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password'
  }

  toggleShowPassword(event: Event) {
    this.showPassword = !this.showPassword
  }

  onSubmit(): void {
    if (this.form.valid) {
      const {id, sucursal,nombre, apPaterno, apMaterno, direccion, pass } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: PersonaInsertRequest = {
        nombre: nombre,
        apPaterno: apPaterno,
        apMaterno: apMaterno,
        direccion: direccion,
        pass: pass,
        usuario: usuarioActualiza
      }

      const updateRequest: PersonaUpdateRequest = {
        id: id,
        sucursal: sucursal,
        nombre: nombre,
        apPaterno: apPaterno,
        apMaterno: apMaterno,
        direccion: direccion,
        usuario: usuarioActualiza
      }

      const serviceCall = id === 0 ? this.personaService.insertPersona(insertRequest) : this.personaService.updatePersona(updateRequest)
      serviceCall.subscribe({
        next: (res: any) => {
          console.log(res)
          this.getPersonas()
          this.resetForm()
          this.editMode = false
          this.setPasswordValidators()
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
      sucursal: 0,
      nombre: '',
      apPaterno: '',
      apMaterno: '',
      direccion: '',
      pass: ''
    })
  }

  editPersona(data: PersonaModel) {
    this.form.patchValue({
      id: data.Id,
      nombre: data.Nombre,
      apPaterno: data.ApPaterno,
      apMaterno: data.ApMaterno,
      direccion: data.Direccion,
    })
    this.editMode = true
    this.setPasswordValidators()
  }

  setPasswordValidators(): void {
    if (this.editMode) {
      this.form.get('pass')?.clearValidators();
    } else {
      this.form.get('pass')?.setValidators([Validators.required]);
    }
    this.form.get('pass')?.updateValueAndValidity();
  }

  deletePersona(Id: number) {
    this.sweetAlertService.confirm({
      title: 'Eliminar Persona',
      text: '¿Estás seguro que deseas eliminar esta persona?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.deletePersona(Id).subscribe({
          next: (res: any) => {
            console.log(res)
            this.getPersonas()
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      }
    })
  }
}
