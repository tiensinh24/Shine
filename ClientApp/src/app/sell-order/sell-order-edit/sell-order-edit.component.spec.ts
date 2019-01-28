import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellOrderEditComponent } from './sell-order-edit.component';

describe('SellOrderEditComponent', () => {
  let component: SellOrderEditComponent;
  let fixture: ComponentFixture<SellOrderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellOrderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
