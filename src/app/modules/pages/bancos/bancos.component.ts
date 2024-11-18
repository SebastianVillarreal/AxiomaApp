import { Component, inject, OnInit } from '@angular/core';
import { NbActionComponent, NbCardModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

//services
import { BancoService } from '@Services';
import { NbToastrService } from '@nebular/theme';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

//models
import { BancoInsertRequest, BancoModel, BancoUpdateRequest } from '@Models/Banco';

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
  private sweetAlertService = inject(SweetAlertService);

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
    })
  }

  onSubmit(): void{
    if(this.form.valid){
      const {id,nombre, direccion} = this.form.getRawValue();
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario')??'0')

      const request: BancoInsertRequest ={
        Nombre: nombre.trim(),
        Direcccion: direccion.trim(),
        UsuarioActualiza: usuarioActualiza
      }

      const requestUpdate: BancoUpdateRequest = {
        Id: id,
        Nombre: nombre.trim(),
        Direcccion: direccion.trim(),
        UsuarioActualiza: usuarioActualiza
      }

      const serviceCall = id == 0 ? this.bancoService.InsertBanco(request) : this.bancoService.UpdateBanco(requestUpdate);
      serviceCall.subscribe({
        next: (res: any) => {
          this.resetForm();
          this.getAllBancos();
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
    this.form.patchValue({
      id: data.Id,
      nombre: data.Nombre,
      direccion: data.Direccion
    })
  }

  deleteBanco(Id: number){
    this.sweetAlertService.confirm({
      title: '¿Estás seguro que deseas eliminar permanentemente este banco?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bancoService.DeleteBanco(Id)
          .subscribe({
            next: (res) => {
              this.getAllBancos();
            },
            error: (err) => {
              console.log(err);
            }
          });
      }
    });
  }
}
