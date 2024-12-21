import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';
import { UsuarioModel } from '@Models/Usuario';
import { SweetAlertService } from '@Service/SweetAlert';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit{
  private usuarioService = inject(UsuarioService)
  private sweetAlertService = inject(SweetAlertService)

  usuariosList: UsuarioModel[] = []

  ngOnInit(): void {
    this.getUsuarios()
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuariosList = data
      console.log(this.usuariosList)
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
