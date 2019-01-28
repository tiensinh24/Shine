import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOrderDetailComponent } from './buy-order-detail.component';

describe('BuyOrderDetailComponent', () => {
  let component: BuyOrderDetailComponent;
  let fixture: ComponentFixture<BuyOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
