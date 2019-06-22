import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked } from '@angular/core';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';
import { OrderBySupplierPivotMonth } from 'src/app/supplier/_interfaces/reports/order-by-supplier-pivot-month';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-order-buy-report-supplier',
  templateUrl: './order-buy-report-supplier.component.html',
  styleUrls: ['./order-buy-report-supplier.component.scss']
})
export class OrderBuyReportSupplierComponent implements OnInit, AfterViewInit, OnDestroy {
  // Subscription
  pivotData$: Subscription;

  years = [];
  currentYear = moment().year();

  // chart
  showingChart = false;
  chartData: OrderBySupplierPivotMonth;

  dataSource: MatTableDataSource<OrderBySupplierPivotMonth>;
  columnsToDisplay = [
    'supplierName',
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
    'total',
    'actions'
  ];
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
    this.getData(this.currentYear);
    this.initialYears();
    this.getTotalRow();
  }

  ngAfterViewInit() {
    this.getTotalRow();
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
    this.pivotData$ = this.supplierService
      .getOrderBySupplierPivotMonth(year)
      .subscribe((res: OrderBySupplierPivotMonth[]) => {
        this.dataSource = new MatTableDataSource<OrderBySupplierPivotMonth>(
          res
        );
      });
  }

  getTotalRow() {
      if (this.monthCols !== undefined) {
        this.monthCols.forEach(col => {
          this.chartData[col.key] = this.getTotal(col.key);
        });
        console.log(this.chartData);
      }
    
  }

  getTotal(col: string) {
    return this.dataSource ? this.dataSource.data
      .map(t => t[col])
      .reduce((acc, value) => acc + value, 0) : 0;
  }

  toggleChart(row: OrderBySupplierPivotMonth) {
    this.showingChart = !this.showingChart;
    this.chartData = row;
  }
}
