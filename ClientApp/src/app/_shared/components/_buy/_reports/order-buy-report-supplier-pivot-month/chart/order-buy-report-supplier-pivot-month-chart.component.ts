import { Component, OnInit, Input } from '@angular/core';
import { OrderBySupplierPivotMonth } from 'src/app/supplier/_interfaces/reports/order-by-supplier-pivot-month';

@Component({
  selector: 'app-order-buy-report-supplier-pivot-month-chart',
  templateUrl: './order-buy-report-supplier-pivot-month-chart.component.html',
  styleUrls: ['./order-buy-report-supplier-pivot-month-chart.component.css']
})
export class OrderBuyReportSupplierPivotMonthChartComponent implements OnInit {
  @Input() chartYear:  number;
  @Input() chartData: OrderBySupplierPivotMonth;

  title = '';
  type = 'ColumnChart';
  data = [[]];
  columnNames = ['Month', 'Values'];
  options = {};

  constructor() {}

  ngOnInit() {
    this.title = `Order value by ${this.chartData.supplierName} in ${this.chartYear}`;
    this.data = [
      ['Jan', +`${this.chartData.jan}`],
      ['Feb', +`${this.chartData.feb}`],
      ['Mar', +`${this.chartData.mar}`],
      ['Apr', +`${this.chartData.apr}`],
      ['May', +`${this.chartData.may}`],
      ['Jun', +`${this.chartData.jun}`],
      ['Jul', +`${this.chartData.jul}`],
      ['Aug', +`${this.chartData.aug}`],
      ['Sep', +`${this.chartData.sep}`],
      ['Oct', +`${this.chartData.oct}`],
      ['Nov', +`${this.chartData.nov}`],
      ['Dec', +`${this.chartData.dec}`],
      ['Total', +`${this.chartData.total}`]
    ];
  }
}
