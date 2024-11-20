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

  elementoBuscado: string = "";
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

  editRow(data: any){
    this.editEmit.emit(data)
  }

  deleteRow(data: any){
    this.deleteEmit.emit(data[this.keyRow])
  }
}
