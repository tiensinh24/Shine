import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderBuyCreateComponent } from './order-buy-create.component';


describe('OrderBuyCreateComponent', () => {
  let component: OrderBuyCreateComponent;
  let fixture: ComponentFixture<OrderBuyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderBuyCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
