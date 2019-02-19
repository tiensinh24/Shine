import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySellDialogComponent } from './category-sell-dialog.component';

describe('CategorySellDialogComponent', () => {
  let component: CategorySellDialogComponent;
  let fixture: ComponentFixture<CategorySellDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySellDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySellDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
