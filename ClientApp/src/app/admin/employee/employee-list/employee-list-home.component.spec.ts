import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListHomeComponent } from './employee-list-home.component';

describe('SupplierListHomeComponent', () => {
  let component: EmployeeListHomeComponent;
  let fixture: ComponentFixture<EmployeeListHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
