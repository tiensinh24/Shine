import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySellHomeComponent } from './category-sell-home.component';

describe('CategorySellHomeComponent', () => {
  let component: CategorySellHomeComponent;
  let fixture: ComponentFixture<CategorySellHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySellHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySellHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
