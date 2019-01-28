import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellOrderHomeComponent } from './sell-order-home.component';

describe('SellOrderHomeComponent', () => {
  let component: SellOrderHomeComponent;
  let fixture: ComponentFixture<SellOrderHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellOrderHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellOrderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
