import { Component, inject, OnInit } from '@angular/core';
import { NbActionComponent, NbCardModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

//services
import { BancoService } from '@Services';
import { NbToastrService } from '@nebular/theme';

//models
import { BancoInsertRequest, BancoModel } from '@Models/Banco';

import { CustomTableComponent } from 'src/app/shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-bancos',
  standalone: true,
  imports: [NbCardModule, NbInputModule, NbButtonModule, CustomTableComponent, ReactiveFormsModule],
  providers: [NbActionComponent, NbToastrService],
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.scss']
})
export class BancosComponent implements OnInit {
  constructor() {}
  private fb = inject(FormBuilder);
  private bancoService = inject(BancoService);
  private toastr = inject(NbToastrService);

  bancosList: BancoModel[] = [];

  form = this.fb.nonNullable.group({
    id:[0],
    nombre: ['', [Validators.required, Validators.pattern('^\s*$')]],
    direccion: ['', [Validators.required, Validators.pattern('^\s*$')]]
  })

  ngOnInit(): void {
    this.getAllBancos();
  }

  getAllBancos() {
    this.bancoService.GetAllBancos().subscribe((data)=> {
      this.bancosList = data.Response.data
      console.log(this.bancosList)
    })
  }

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
      id: 0,
      nombre: '',
      direccion: ''
    })
  }

  editBanco(data: BancoModel)
  {
    console.log(data)
  }

  deleteBanco(Id: number){
    console.log(Id);
  }
}
