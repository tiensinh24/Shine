import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { OrderBySupplierPivotQuarter } from 'src/app/supplier/_interfaces/reports/order-by-supplier-pivot-quarter';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';

@Component({
  selector: 'app-order-buy-report-supplier-pivot-quarter',
  templateUrl: './order-buy-report-supplier-pivot-quarter.component.html',
  styleUrls: ['./order-buy-report-supplier-pivot-quarter.component.scss']
})
export class OrderBuyReportSupplierPivotQuarterComponent implements OnInit, OnDestroy {
  // Subscription
  pivotData$: Subscription;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  years = [];
  selectedYear = moment().year();

  // chart
  showingChart = false;
  chartData = <OrderBySupplierPivotQuarter>{};
  chartTotalData = <OrderBySupplierPivotQuarter>{};

  dataSource: MatTableDataSource<OrderBySupplierPivotQuarter>;
  columnsToDisplay = ['supplierName', 'quarterOne', 'quarterTwo', 'quarterThree', 'quarterFourth', 'total', 'actions'];
  monthCols = [
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
      this.dataSource.sort = this.sort;
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

  toggleChart(row?: OrderBySupplierPivotQuarter) {
    this.showingChart = !this.showingChart;

    this.chartData = row;
  }

  toggleTotalChart() {
    this.showingChart = !this.showingChart;

    this.getTotalRow();

    this.chartData = this.chartTotalData;
  }
}
