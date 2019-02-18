import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBuyHomeComponent } from './category-buy-home.component';

describe('CategoryBuyHomeComponent', () => {
  let component: CategoryBuyHomeComponent;
  let fixture: ComponentFixture<CategoryBuyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBuyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBuyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
