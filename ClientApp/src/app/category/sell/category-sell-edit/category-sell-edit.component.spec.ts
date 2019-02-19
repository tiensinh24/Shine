import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySellEditComponent } from './category-sell-edit.component';

describe('CategorySellEditComponent', () => {
  let component: CategorySellEditComponent;
  let fixture: ComponentFixture<CategorySellEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySellEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySellEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
