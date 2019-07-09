import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { OrderBySupplierPivotQuarter } from 'src/app/_shared/intefaces/buy/supplier/report/order-by-supplier-pivot-quarter';

@Component({
  selector: 'app-order-buy-report-supplier-pivot-quarter',
  templateUrl: './order-buy-report-supplier-pivot-quarter.component.html',
  styleUrls: ['./order-buy-report-supplier-pivot-quarter.component.scss']
})
export class OrderBuyReportSupplierPivotQuarterComponent implements OnInit, OnDestroy {
  // Subscription
  pivotData$: Subscription;

  private sort: MatSort;
  @ViewChild(MatSort, { static: false }) set matSort(matSort: MatSort) {
    this.sort = matSort;
    this.dataSource.sort = this.sort;
  }

  years = [];
  selectedYear = moment().year();

  // chart
  showingChart = false;
  chartData = <OrderBySupplierPivotQuarter>{};
  chartTotalData = <OrderBySupplierPivotQuarter>{};

  dataSource = new MatTableDataSource<OrderBySupplierPivotQuarter>();
  columnsToDisplay = ['supplierName', 'quarterOne', 'quarterTwo', 'quarterThree', 'quarterFourth', 'total', 'actions'];
  quarterCols = [
    { key: 'quarterOne', value: 'Q01' },
    { key: 'quarterTwo', value: 'Q02' },
    { key: 'quarterThree', value: 'Q03' },
    { key: 'quarterFourth', value: 'Q04' },
    { key: 'total', value: 'Total' }
  ];

  constructor(private supplierService: SupplierService) {}

  ngOnInit() {
    this.getData(this.selectedYear);
    this.initialYears();
  }

  ngOnDestroy() {
    this.pivotData$.unsubscribe();
  }

  initialYears() {
    for (let i = 0; i < 5; i++) {
      const year = moment().year() - i;

      this.years.push(year);
    }
  }

  getData(year: number) {
    this.pivotData$ = this.supplierService.getOrderBySupplierPivotQuarter(year).subscribe((res: OrderBySupplierPivotQuarter[]) => {
      this.dataSource = new MatTableDataSource<OrderBySupplierPivotQuarter>(res);
    });
  }

  getTotalRow() {
    this.chartTotalData.supplierName = 'all suppliers';

    this.quarterCols.forEach(col => {
      this.chartTotalData[col.key] = this.getTotal(col.key);
    });
  }

  getTotal(col: string) {
    return this.dataSource ? this.dataSource.data.map(t => t[col]).reduce((acc, value) => acc + value, 0) : 0;
  }

  toggleChart(row?: OrderBySupplierPivotQuarter) {
    this.showingChart = !this.showingChart;
    this.chartData = row;
    this.dataSource.sort = this.sort;
  }

  toggleTotalChart() {
    this.showingChart = !this.showingChart;
    this.getTotalRow();
    this.chartData = this.chartTotalData;
    this.dataSource.sort = this.sort;
  }
}
