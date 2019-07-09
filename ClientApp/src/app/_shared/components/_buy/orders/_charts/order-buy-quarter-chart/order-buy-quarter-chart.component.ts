import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild
  } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { OrderAndCostPerQuarter } from 'src/app/_shared/intefaces/buy/order/report/order-and-cost-per-quarter';

@Component({
  selector: 'app-order-buy-quarter-chart',
  templateUrl: './order-buy-quarter-chart.component.html',
  styleUrls: ['./order-buy-quarter-chart.component.scss']
})
export class OrderBuyQuarterChartComponent implements OnInit {
  @Input() year: number;
  @Input() chartData: OrderAndCostPerQuarter[] = [];

  title = '';
  type = 'ColumnChart';
  data = [[]];
  columnNames = ['Quarter', 'Value', 'Cost'];
  options = {
    // width: 600,
    // height: 400,
    // legend: { position: 'top', maxLines: 3 },
    // bar: { groupWidth: '75%' },
    // isStacked: true
  };
  @ViewChild('chart', { static: false }) chart: GoogleChartComponent;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.chart.wrapper.draw();
  }

  constructor() {}

  ngOnInit() {
    this.title = `Order value and cost ${this.year}`;

    if (this.chartData) {
      this.data.shift();

      this.chartData.forEach(row => {
        const rowChart = ['Q0' + row.quarter, row.amount, row.cost];

        this.data.push(rowChart);
      });
    }
  }

}
