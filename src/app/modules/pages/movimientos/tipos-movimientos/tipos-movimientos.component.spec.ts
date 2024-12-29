import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposMovimientosComponent } from './tipos-movimientos.component';

describe('TiposMovimientosComponent', () => {
  let component: TiposMovimientosComponent;
  let fixture: ComponentFixture<TiposMovimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposMovimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
