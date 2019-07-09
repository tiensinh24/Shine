import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBuyListComponent } from './category-buy-list.component';

describe('CategoryBuyListComponent', () => {
  let component: CategoryBuyListComponent;
  let fixture: ComponentFixture<CategoryBuyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBuyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBuyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
