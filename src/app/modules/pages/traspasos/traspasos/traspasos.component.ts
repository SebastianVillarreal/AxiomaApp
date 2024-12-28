import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SucursalModel } from '@Models/Sucursal';
import { TraspasoInsertRequest } from '@Models/Traspaso';
import { UsuarioModel } from '@Models/Usuario';
import { NbButtonModule, NbCardModule, NbSelectModule } from '@nebular/theme';
import { SucursalService, TraspasoService, UsuarioService } from '@Services';

@Component({
  selector: 'app-traspasos',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, NbSelectModule, NbCardModule, NbButtonModule],
  templateUrl: './traspasos.component.html',
  styleUrls: ['./traspasos.component.scss']
})
export class TraspasosComponent implements OnInit {
  private traspasoSerivice = inject(TraspasoService)
  private sucursalService = inject(SucursalService)
  private usuarioService = inject(UsuarioService)
  private fb = inject(FormBuilder)

  sucursalesList: SucursalModel[] = []
  usuariosList: UsuarioModel[] = []

  form = this.fb.nonNullable.group({
    idAlmacenOrigen: [0, [Validators.required, Validators.min(1)]],
    idAlmacenDestino: [0, [Validators.required, Validators.min(1)]],
    usuarioEnvia: [0, [Validators.required, Validators.min(1)]]
  })

  ngOnInit(): void {
    this.getSucursales()
    this.getUsuarios()
  }

  getSucursales(): void {
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursalesList = data
    })
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuariosList = data
    })
  }

  onSubmit(): void {
    const { idAlmacenOrigen, idAlmacenDestino, usuarioEnvia } = this.form.getRawValue()
    const usuarioActualiza = parseInt(localStorage.getItem("idUsuario") ?? "0")
    
    const insertRequest : TraspasoInsertRequest = {
      idAlmacenOrigen: idAlmacenOrigen,
      idAlmacenDestino: idAlmacenDestino,
      usuarioEnvia: usuarioEnvia,
      usuarioActualiza: usuarioActualiza
    }

    this.traspasoSerivice.insertTraspaso(insertRequest).subscribe({
      next: (res: any) => {
        console.log(res)
        this.resetForm()
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  resetForm(): void {
    this.form.reset({
      idAlmacenOrigen: 0,
      idAlmacenDestino: 0,
      usuarioEnvia: 0
    })
  }


}
