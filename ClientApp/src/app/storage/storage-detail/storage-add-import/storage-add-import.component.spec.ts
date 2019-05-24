import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageAddImportComponent } from './storage-add-import.component';

describe('StorageAddImportComponent', () => {
  let component: StorageAddImportComponent;
  let fixture: ComponentFixture<StorageAddImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageAddImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageAddImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
