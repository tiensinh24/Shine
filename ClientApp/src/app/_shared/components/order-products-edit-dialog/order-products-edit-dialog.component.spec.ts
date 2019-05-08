import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductsEditDialogComponent } from './order-products-edit-dialog.component';

describe('OrderProductsEditDialogComponent', () => {
  let component: OrderProductsEditDialogComponent;
  let fixture: ComponentFixture<OrderProductsEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderProductsEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProductsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
