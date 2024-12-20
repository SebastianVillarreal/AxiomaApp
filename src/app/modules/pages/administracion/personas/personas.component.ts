import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';
import { PersonaModel } from '@Models/Persona';
import { PersonaService } from '@Services';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {
  private personaService = inject(PersonaService)
  
  personasList: PersonaModel[] = []

  ngOnInit(): void {
    this.getPersonas()
  }

  private getPersonas(): void {
    this.personaService.getPersonas().subscribe((data) => {
      this.personasList = data.Response.data
    })
  }
}
