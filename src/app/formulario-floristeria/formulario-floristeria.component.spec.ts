import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFloristeriaComponent } from './formulario-floristeria.component';

describe('FormularioFloristeriaComponent', () => {
  let component: FormularioFloristeriaComponent;
  let fixture: ComponentFixture<FormularioFloristeriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioFloristeriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioFloristeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
