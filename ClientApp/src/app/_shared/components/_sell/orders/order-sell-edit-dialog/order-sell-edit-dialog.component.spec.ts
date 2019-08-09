import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSellEditDialogComponent } from './order-sell-edit-dialog.component';

describe('OrderSellEditDialogComponent', () => {
  let component: OrderSellEditDialogComponent;
  let fixture: ComponentFixture<OrderSellEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSellEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSellEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
