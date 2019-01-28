import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellOrderDetailComponent } from './sell-order-detail.component';

describe('SellOrderDetailComponent', () => {
  let component: SellOrderDetailComponent;
  let fixture: ComponentFixture<SellOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
