import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOrderListComponent } from './buy-order-list.component';

describe('BuyOrderListComponent', () => {
  let component: BuyOrderListComponent;
  let fixture: ComponentFixture<BuyOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
