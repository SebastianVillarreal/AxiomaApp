import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOrdenesComprasComponent } from './detalle-ordenes-compras.component';

describe('DetalleOrdenesComprasComponent', () => {
  let component: DetalleOrdenesComprasComponent;
  let fixture: ComponentFixture<DetalleOrdenesComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleOrdenesComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleOrdenesComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
