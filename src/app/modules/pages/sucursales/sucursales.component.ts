import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';
import { SucursalModel } from '@Models/Sucursal';
import { SucursalService } from '@Services';

@Component({
  selector: 'app-sucursales',
  standalone: true, 
  imports: [CustomTableComponent],
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {
  private sucursalService = inject(SucursalService);

  sucursalesList: SucursalModel[] = [];

  ngOnInit(): void {
    this.getSucursales()
  }

  getSucursales(): void {
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursalesList = data;
    })
  }

}
