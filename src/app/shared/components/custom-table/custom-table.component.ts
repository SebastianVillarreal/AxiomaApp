import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NbIconModule } from '@nebular/theme';
@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [NgFor, NgIf, NbIconModule],
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent {
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

  constructor() {}

  editRow(data: any){
    this.editEmit.emit(data)
  }

  deleteRow(data: any){
    this.deleteEmit.emit(data[this.keyRow])
  }
}
