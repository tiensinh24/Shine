import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierReportHomeComponent } from './supplier-report-home.component';

describe('SupplierReportHomeComponent', () => {
  let component: SupplierReportHomeComponent;
  let fixture: ComponentFixture<SupplierReportHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierReportHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierReportHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
