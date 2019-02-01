import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSellListComponent } from './product-sell-list.component';

describe('ProductSellListComponent', () => {
  let component: ProductSellListComponent;
  let fixture: ComponentFixture<ProductSellListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSellListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
