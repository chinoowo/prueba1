import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioCredencialesPage } from './cambio-credenciales.page';

describe('CambioCredencialesPage', () => {
  let component: CambioCredencialesPage;
  let fixture: ComponentFixture<CambioCredencialesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CambioCredencialesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
