import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBuyListComponent } from './product-buy-list.component';

describe('ProductListComponent', () => {
  let component: ProductBuyListComponent;
  let fixture: ComponentFixture<ProductBuyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBuyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBuyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
