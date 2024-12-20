import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatModulosComponent } from './cat-modulos.component';

describe('CatModulosComponent', () => {
  let component: CatModulosComponent;
  let fixture: ComponentFixture<CatModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatModulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
