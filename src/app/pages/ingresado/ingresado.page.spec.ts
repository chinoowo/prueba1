import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresadoPage } from './ingresado.page';

describe('IngresadoPage', () => {
  let component: IngresadoPage;
  let fixture: ComponentFixture<IngresadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IngresadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
