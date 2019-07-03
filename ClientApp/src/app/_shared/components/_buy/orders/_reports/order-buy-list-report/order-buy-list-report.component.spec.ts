import { OrderBuyListReportComponent } from './order-buy-list-report.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('OrderBuyListComponent', () => {
  let component: OrderBuyListReportComponent;
  let fixture: ComponentFixture<OrderBuyListReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyListReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
