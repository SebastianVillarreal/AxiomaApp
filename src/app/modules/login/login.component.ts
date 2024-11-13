import { Component, inject } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

import { NbInputModule, NbButtonModule} from '@nebular/theme';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { LoginRequest } from 'src/app/core/models/login/login';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NbInputModule, NbButtonModule],
  styleUrls: ['./login.component.scss']
})
export class NgxLoginComponent extends NbLoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(LoginService)

  form = this.fb.nonNullable.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit(): void {
    if (this.form.valid) {
      const { usuario, password } = this.form.getRawValue();
      const request: LoginRequest = {
        username: usuario,
        userpassword: password
      };
      this.auth.auth(request)
        .subscribe({
          next: (res) => {
            const data = res.Response.data;
            if (data.Token != null) {
            localStorage.setItem('token', data.Token);
            localStorage.setItem('idUsuario', data.Usuario.Id.toString());
            localStorage.setItem('idPerfil', data.Usuario.IdPerfil.toString());
            localStorage.setItem('usuario', data.Usuario.NombreUsuario);
            localStorage.setItem('nombrePersona', data.Usuario.NombrePersona);
              console.log("Iniciaste sesión")
              this.router.navigate(['/home']);
            }
            else {
              console.log("Usuario o contraseña invalido")
            }
          },
          error: (err) => {
            console.log(err.Message);
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
