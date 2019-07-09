import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBuyEditComponent } from './category-buy-edit.component';

describe('CategoryBuyEditComponent', () => {
  let component: CategoryBuyEditComponent;
  let fixture: ComponentFixture<CategoryBuyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBuyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBuyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
