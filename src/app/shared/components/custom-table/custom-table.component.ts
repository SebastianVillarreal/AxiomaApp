import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgFor, NgIf, } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbIconModule } from '@nebular/theme';
@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [NgFor, NgIf, NbIconModule, FormsModule],
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent{
  @Input() keyRow: string = "Id";
  @Input() tableHead: string = "Tabla";
  @Input() headers: any[] = [];
  @Input() data: any[] = [];
  @Input() keys: any[] =[];
  @Input() hasSearch: boolean = false;
  @Input() hasEdit: boolean = false;
  @Input() hasDelete: boolean = false;
  
  @Output() editEmit: EventEmitter<any> = new EventEmitter();
  @Output() deleteEmit: EventEmitter<any> = new EventEmitter();

  //Buscar elemento
  elementoBuscado: string = "";

  //Ordenar elemento
  sortKey: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  constructor() {}

  get filtrarDatos(): any[] {
    const elemento = this.elementoBuscado.toLowerCase();

    if(!elemento)
    {
      return this.data;
    }
    else{
      return this.data.filter(row =>
        this.keys.some(key =>
          row[key].toString().toLowerCase().includes(elemento)
        )
      )
    }
  }

  sortData(column: string)
  {
    if (this.sortKey == column)
    {
      this.sortDirection = this.sortDirection == 'asc' ? 'desc' : 'asc';
    }
    else
    {
      this.sortKey = column;
      this.sortDirection = 'asc';
    }

    this.filtrarDatos.sort((a,b) => {
      const valA = a[column];
      const valB = b[column];

      if (valA == null || valB == null) return 0;

      const comparison = valA > valB ? 1 : valA < valB ? -1 : 0;

      return this.sortDirection === 'asc' ? comparison : -comparison;
    })
  }

  editRow(data: any){
    this.editEmit.emit(data)
  }

  deleteRow(data: any){
    this.deleteEmit.emit(data[this.keyRow])
  }
}
