import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuyComponent } from './admin-buy.component';

describe('AdminBuyComponent', () => {
  let component: AdminBuyComponent;
  let fixture: ComponentFixture<AdminBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
