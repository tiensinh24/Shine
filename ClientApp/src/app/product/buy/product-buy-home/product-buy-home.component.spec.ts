import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBuyHomeComponent } from './product-buy-home.component';

describe('ProductHomeComponent', () => {
  let component: ProductBuyHomeComponent;
  let fixture: ComponentFixture<ProductBuyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBuyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBuyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
