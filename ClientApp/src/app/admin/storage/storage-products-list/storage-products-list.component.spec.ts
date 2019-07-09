import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageProductsListComponent } from './storage-products-list.component';

describe('StorageProductsListComponent', () => {
  let component: StorageProductsListComponent;
  let fixture: ComponentFixture<StorageProductsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageProductsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
