import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOrderHomeComponent } from './buy-order-home.component';

describe('BuyOrderHomeComponent', () => {
  let component: BuyOrderHomeComponent;
  let fixture: ComponentFixture<BuyOrderHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyOrderHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOrderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
