import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProductsAddedComponent } from './supplier-products-added.component';

describe('ProductsNotAddedComponent', () => {
  let component: SupplierProductsAddedComponent;
  let fixture: ComponentFixture<SupplierProductsAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierProductsAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProductsAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
