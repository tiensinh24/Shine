import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageProductEditDialogComponent } from './storage-product-edit-dialog.component';

describe('StorageProductEditDialogComponent', () => {
  let component: StorageProductEditDialogComponent;
  let fixture: ComponentFixture<StorageProductEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageProductEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageProductEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
