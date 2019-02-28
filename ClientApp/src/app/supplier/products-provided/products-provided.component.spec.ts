import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProvidedComponent } from './products-provided.component';

describe('ProductsProvidedComponent', () => {
  let component: ProductsProvidedComponent;
  let fixture: ComponentFixture<ProductsProvidedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsProvidedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsProvidedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
