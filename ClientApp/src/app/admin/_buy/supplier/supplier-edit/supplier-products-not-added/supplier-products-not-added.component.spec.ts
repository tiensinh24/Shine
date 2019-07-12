import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierProductsNotAddedComponent } from './supplier-products-not-added.component';



describe('AddProductsForSupplierComponent', () => {
  let component: SupplierProductsNotAddedComponent;
  let fixture: ComponentFixture<SupplierProductsNotAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierProductsNotAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProductsNotAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
