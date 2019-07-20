import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostEditDialogComponent } from './cost-edit-dialog.component';

describe('CostEditDialogComponent', () => {
  let component: CostEditDialogComponent;
  let fixture: ComponentFixture<CostEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
