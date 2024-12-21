import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';
import { ProveedorModel } from '@Models/Proveedor';
import { ProveedorService } from '@Services';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit{
  private proveedorService = inject(ProveedorService)

  proveedoresList: ProveedorModel[] = []

  ngOnInit(): void {
    this.getProveedores()
  }

  getProveedores(): void {
    this.proveedorService.getProveedores().subscribe((data) => {
      this.proveedoresList = data.Response.data
    })
  }
}
