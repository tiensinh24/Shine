import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBuyComponent } from './product-buy.component';

describe('ProductComponent', () => {
  let component: ProductBuyComponent;
  let fixture: ComponentFixture<ProductBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
