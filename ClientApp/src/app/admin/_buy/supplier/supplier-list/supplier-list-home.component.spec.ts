import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierListHomeComponent } from './supplier-list-home.component';

describe('SupplierListHomeComponent', () => {
  let component: SupplierListHomeComponent;
  let fixture: ComponentFixture<SupplierListHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierListHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
