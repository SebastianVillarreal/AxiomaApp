import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';
import { UsuarioModel } from '@Models/Usuario';
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
}
