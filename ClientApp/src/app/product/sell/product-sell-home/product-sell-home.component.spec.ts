import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSellHomeComponent } from './product-sell-home.component';

describe('ProductSellHomeComponent', () => {
  let component: ProductSellHomeComponent;
  let fixture: ComponentFixture<ProductSellHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSellHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSellHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
