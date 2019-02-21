import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBuyDetailComponent } from './category-buy-detail.component';

describe('CategoryBuyDetailComponent', () => {
  let component: CategoryBuyDetailComponent;
  let fixture: ComponentFixture<CategoryBuyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBuyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBuyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
