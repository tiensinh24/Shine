import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyEditDialogComponent } from './order-buy-edit-dialog.component';

describe('OrderBuyEditDialogComponent', () => {
  let component: OrderBuyEditDialogComponent;
  let fixture: ComponentFixture<OrderBuyEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
