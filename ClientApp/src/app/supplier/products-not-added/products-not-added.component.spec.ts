import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsNotAddedComponent } from './products-not-added.component';

describe('AddProductsForSupplierComponent', () => {
  let component: ProductsNotAddedComponent;
  let fixture: ComponentFixture<ProductsNotAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsNotAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsNotAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
