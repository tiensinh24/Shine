import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellOrderListComponent } from './sell-order-list.component';

describe('SellOrderListComponent', () => {
  let component: SellOrderListComponent;
  let fixture: ComponentFixture<SellOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
