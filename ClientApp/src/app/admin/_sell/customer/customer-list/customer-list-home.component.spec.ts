import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListHomeComponent } from './customer-list-home.component';

describe('CustomerListHomeComponent', () => {
  let component: CustomerListHomeComponent;
  let fixture: ComponentFixture<CustomerListHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerListHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
