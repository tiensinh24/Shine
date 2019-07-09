import { Component, OnInit, Input } from '@angular/core';
import { OrderBySupplierPivotQuarter } from 'src/app/_shared/intefaces/buy/supplier/report/order-by-supplier-pivot-quarter';


@Component({
  selector: 'app-order-buy-report-supplier-pivot-quarter-chart',
  templateUrl: './order-buy-report-supplier-pivot-quarter-chart.component.html',
  styleUrls: ['./order-buy-report-supplier-pivot-quarter-chart.component.scss']
})
export class OrderBuyReportSupplierPivotQuarterChartComponent implements OnInit {
  @Input() chartYear: number;
  @Input() chartData: OrderBySupplierPivotQuarter;

  title = '';
  type = 'ColumnChart';
  data = [[]];
  columnNames = ['Quarter', 'Values'];
  options = {};

  constructor() {}

  ngOnInit() {
    this.title = `Order value by ${this.chartData.supplierName} in ${this.chartYear}`;
    this.data = [
      ['Q01', +`${this.chartData.quarterOne}`],
      ['Q02', +`${this.chartData.quarterTwo}`],
      ['Q03', +`${this.chartData.quarterThree}`],
      ['Q04', +`${this.chartData.quarterFourth}`],
      ['Total', +`${this.chartData.total}`]
    ];
  }
}
