import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { OrderBySupplierPivotMonth } from 'src/app/_shared/intefaces/buy/supplier/report/order-by-supplier-pivot-month';

@Component({
  selector: 'app-order-buy-report-supplier-pivot-month',
  templateUrl: './order-buy-report-supplier-pivot-month.component.html',
  styleUrls: ['./order-buy-report-supplier-pivot-month.component.scss']
})
export class OrderBuyReportSupplierPivotMonthComponent implements OnInit, OnDestroy {
  // Subscription
  pivotData$: Subscription;

  private sort: MatSort;
  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.dataSource.sort = this.sort;
  }

  years = [];
  selectedYear = moment().year();

  // chart
  showingChart = false;
  chartData = <OrderBySupplierPivotMonth>{};
  chartTotalData = <OrderBySupplierPivotMonth>{};

  dataSource = new MatTableDataSource<OrderBySupplierPivotMonth>();
  columnsToDisplay = ['supplierName', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'total', 'actions'];
  monthCols = [
    { key: 'jan', value: 'Jan' },
    { key: 'feb', value: 'Feb' },
    { key: 'mar', value: 'Mar' },
    { key: 'apr', value: 'Apr' },
    { key: 'may', value: 'May' },
    { key: 'jun', value: 'Jun' },
    { key: 'jul', value: 'Jul' },
    { key: 'aug', value: 'Aug' },
    { key: 'sep', value: 'Sep' },
    { key: 'oct', value: 'Oct' },
    { key: 'nov', value: 'Nov' },
    { key: 'dec', value: 'Dec' },
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
    this.pivotData$ = this.supplierService.getOrderBySupplierPivotMonth(year).subscribe((res: OrderBySupplierPivotMonth[]) => {
      this.dataSource = new MatTableDataSource<OrderBySupplierPivotMonth>(res);
    });
  }

  getTotalRow() {
    this.chartTotalData.supplierName = 'all suppliers';

    this.monthCols.forEach(col => {
      this.chartTotalData[col.key] = this.getTotal(col.key);
    });
  }

  getTotal(col: string) {
    return this.dataSource ? this.dataSource.data.map(t => t[col]).reduce((acc, value) => acc + value, 0) : 0;
  }

  toggleChart(row?: OrderBySupplierPivotMonth) {
    this.showingChart = !this.showingChart;

    this.chartData = row;
  }

  toggleTotalChart() {
    this.showingChart = !this.showingChart;

    this.getTotalRow();

    this.chartData = this.chartTotalData;
  }
}
