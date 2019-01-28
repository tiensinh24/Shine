import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOrderEditComponent } from './buy-order-edit.component';

describe('BuyOrderEditComponent', () => {
  let component: BuyOrderEditComponent;
  let fixture: ComponentFixture<BuyOrderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyOrderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
