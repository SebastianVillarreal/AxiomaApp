import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { PersonaInsertRequest, PersonaModel } from '@Models/Persona';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { PersonaService } from '@Services';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf,NbCardModule, NbInputModule, NbButtonModule, NbFormFieldModule, NbIconModule],
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {
  private personaService = inject(PersonaService)
  private fb = inject(FormBuilder)

  showPassword = false

  personasList: PersonaModel[] = []
  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    apPaterno: ['', [Validators.required]],
    apMaterno: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    pass: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.getPersonas()
  }

  private getPersonas(): void {
    this.personaService.getPersonas().subscribe((data) => {
      this.personasList = data.Response.data
    })
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password'
  }
  toggleShowPassword(event: Event) {
    event.preventDefault()
    this.showPassword = !this.showPassword
  }
  onSubmit(): void {
    if (this.form.valid) {
      const { nombre, apPaterno, apMaterno, direccion, pass } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const insertRequest: PersonaInsertRequest = {
        nombre: nombre,
        apPaterno: apPaterno,
        apMaterno: apMaterno,
        direccion: direccion,
        pass: pass,
        usuario: usuarioActualiza
      }

      const serviceCall = this.personaService.insertPersona(insertRequest)
      serviceCall.subscribe({
        next: (res: any) => {
          console.log(res)
          this.getPersonas()
          this.resetForm()
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }

  resetForm(): void {
    this.form.reset({
      nombre: '',
      apPaterno: '',
      apMaterno: '',
      direccion: '',
      pass: ''
    })
  }
}
