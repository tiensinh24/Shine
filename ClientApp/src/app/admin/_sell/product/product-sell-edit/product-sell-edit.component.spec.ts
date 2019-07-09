import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSellEditComponent } from './product-sell-edit.component';

describe('ProductSellEditComponent', () => {
  let component: ProductSellEditComponent;
  let fixture: ComponentFixture<ProductSellEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSellEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSellEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
