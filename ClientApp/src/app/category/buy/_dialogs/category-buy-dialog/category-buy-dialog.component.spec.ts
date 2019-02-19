import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBuyDialogComponent } from './category-buy-dialog.component';

describe('CategoryBuyEditComponent', () => {
  let component: CategoryBuyDialogComponent;
  let fixture: ComponentFixture<CategoryBuyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBuyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBuyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
