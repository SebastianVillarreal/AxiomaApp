import { Component, inject } from '@angular/core';
import { NbActionComponent, NbCardModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

//services
import { BancoService } from '@Services';
import { NbToastrService } from '@nebular/theme';

//models
import { BancoInsertRequest } from '@Models/Banco';

import { CustomTableComponent } from 'src/app/shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-bancos',
  standalone: true,
  imports: [NbCardModule, NbInputModule, NbButtonModule, CustomTableComponent],
  providers: [NbActionComponent, NbToastrService],
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.scss']
})
export class BancosComponent {
  constructor() {}
  private fb = inject(FormBuilder);

  private bancoService = inject(BancoService)
  private toastr = inject(NbToastrService);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.pattern('^\s*$')]],
    direccion: ['', [Validators.required, Validators.pattern('^\s*$')]]
  })

  onSubmit(): void{
    if(this.form.valid){
      const {nombre, direccion} = this.form.getRawValue();
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario')??'0')
      const request: BancoInsertRequest ={
        Nombre: nombre,
        Direcccion: direccion,
        UsuarioActualiza: usuarioActualiza
      }

    this.bancoService.InsertBanco(request)
    .subscribe({
      next: (res: any) => {
        this.resetForm();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}

  resetForm(): void{
    this.form.reset({
      nombre: '',
      direccion: ''
    })
  }
}
