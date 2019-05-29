import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBuyRemainComponent } from './product-buy-remain.component';

describe('ProductBuyRemainComponent', () => {
  let component: ProductBuyRemainComponent;
  let fixture: ComponentFixture<ProductBuyRemainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBuyRemainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBuyRemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
