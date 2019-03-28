import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBuyCustomListComponent } from './category-buy-custom-list.component';

describe('CategoryBuyCustomListComponent', () => {
  let component: CategoryBuyCustomListComponent;
  let fixture: ComponentFixture<CategoryBuyCustomListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBuyCustomListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBuyCustomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
