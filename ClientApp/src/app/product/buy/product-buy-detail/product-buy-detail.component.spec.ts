import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBuyDetailComponent } from './product-buy-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductBuyDetailComponent;
  let fixture: ComponentFixture<ProductBuyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBuyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBuyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
