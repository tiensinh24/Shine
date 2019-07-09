import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySellComponent } from './category-sell.component';

describe('CategorySellComponent', () => {
  let component: CategorySellComponent;
  let fixture: ComponentFixture<CategorySellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
