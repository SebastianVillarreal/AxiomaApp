import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbCardModule, NbSelectModule, NbButtonModule, NbDatepickerModule, NbInputModule } from '@nebular/theme';
import { OrdenCompraInsertRequest } from '@Models/OrdenCompra';
import { OrdenCompraService } from '@Services';

@Component({
  selector: 'app-ordenes-compras',
  standalone: true,
  imports: [ReactiveFormsModule, NbCardModule, NbSelectModule, NbButtonModule, NbDatepickerModule, NbInputModule],
  templateUrl: './ordenes-compras.component.html',
  styleUrls: ['./ordenes-compras.component.scss']
})
export class OrdenesComprasComponent {
  private ordenCompraService = inject(OrdenCompraService);
  private fb = inject(FormBuilder)

  form = this.fb.nonNullable.group({
    id: [0],
    idProveedor: [0, [Validators.required, Validators.min(1)]],
    fechaLlegada: ['', Validators.required],
    idSucursal: [0, [Validators.required, Validators.min(1)]],
    idComprador: [0, [Validators.required, Validators.min(1)]],
  })

  onSubmit(): void {
    if (this.form.valid)
    {
      const { id, idProveedor, fechaLlegada, idSucursal, idComprador } = this.form.getRawValue()
      const usuarioActualiza = parseInt(localStorage.getItem('idUsuario') ?? '0')
      
      const request: OrdenCompraInsertRequest = {
        idProveedor: idProveedor,
        fechaLlegada: fechaLlegada,
        idSucursal: idSucursal,
        idComprador: idComprador,
        usuarioActualiza: usuarioActualiza
      }

      const serviceCall = this.ordenCompraService.insertOrdenCompra(request)
      serviceCall.subscribe({
        next: (res: any) => {
          console.log(res.response.data);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }
}
