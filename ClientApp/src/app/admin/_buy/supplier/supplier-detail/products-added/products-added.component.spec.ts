import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAddedComponent } from './products-added.component';

describe('ProductsNotAddedComponent', () => {
  let component: ProductsAddedComponent;
  let fixture: ComponentFixture<ProductsAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
