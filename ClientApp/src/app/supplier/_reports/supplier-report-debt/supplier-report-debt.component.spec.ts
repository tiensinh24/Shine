import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierReportDebtComponent } from './supplier-report-debt.component';

describe('SupplierReportDebtComponent', () => {
  let component: SupplierReportDebtComponent;
  let fixture: ComponentFixture<SupplierReportDebtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierReportDebtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierReportDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
