import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBuyEditDialogComponent } from './product-buy-edit-dialog.component';

describe('ProductBuyEditDialogComponent', () => {
  let component: ProductBuyEditDialogComponent;
  let fixture: ComponentFixture<ProductBuyEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBuyEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBuyEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
