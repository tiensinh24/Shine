import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuyHomeComponent } from './admin-buy-home.component';

describe('AdminBuyHomeComponent', () => {
  let component: AdminBuyHomeComponent;
  let fixture: ComponentFixture<AdminBuyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBuyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBuyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
