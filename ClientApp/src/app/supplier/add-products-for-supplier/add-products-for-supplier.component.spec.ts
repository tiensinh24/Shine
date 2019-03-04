import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductsForSupplierComponent } from './add-products-for-supplier.component';

describe('AddProductsForSupplierComponent', () => {
  let component: AddProductsForSupplierComponent;
  let fixture: ComponentFixture<AddProductsForSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductsForSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductsForSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
