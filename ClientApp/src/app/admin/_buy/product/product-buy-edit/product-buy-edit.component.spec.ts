import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBuyEditComponent } from './product-buy-edit.component';

describe('ProductBuyEditDialogComponent', () => {
  let component: ProductBuyEditComponent;
  let fixture: ComponentFixture<ProductBuyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBuyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBuyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
