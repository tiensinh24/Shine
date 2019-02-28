import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProvidedDialogComponent } from './products-provided-dialog.component';

describe('ProductsProvidedDialogComponent', () => {
  let component: ProductsProvidedDialogComponent;
  let fixture: ComponentFixture<ProductsProvidedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsProvidedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsProvidedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
