import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSellDetailComponent } from './product-sell-detail.component';

describe('ProductSellDetailComponent', () => {
  let component: ProductSellDetailComponent;
  let fixture: ComponentFixture<ProductSellDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSellDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSellDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
