import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrincipalCitasComponent } from './principal-citas.component';

describe('PrincipalCitasComponent', () => {
  let component: PrincipalCitasComponent;
  let fixture: ComponentFixture<PrincipalCitasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PrincipalCitasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrincipalCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
