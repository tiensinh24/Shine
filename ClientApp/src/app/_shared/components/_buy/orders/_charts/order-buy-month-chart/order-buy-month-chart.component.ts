import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { OrderAndCostPerMonth } from 'src/app/_shared/intefaces/buy/order/report/order-and-cost-per-month';

@Component({
  selector: 'app-order-buy-month-chart',
  templateUrl: './order-buy-month-chart.component.html',
  styleUrls: ['./order-buy-month-chart.component.scss']
})
export class OrderBuyMonthChartComponent implements OnInit {
  @Input() year: number;
  @Input() chartData: OrderAndCostPerMonth[] = [];

  title = '';
  type = 'ColumnChart';
  data = [[]];
  columnNames = ['Month', 'Value', 'Cost'];
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
        const rowChart = [this.transformMonth(row.month), row.amount, row.cost];

        this.data.push(rowChart);
      });
    }
  }

  private transformMonth(month: number) {
    switch (month) {
      case 1:
        return 'Jan';
        break;
      case 2:
        return 'Feb';
        break;
      case 3:
        return 'Mar';
        break;
      case 4:
        return 'Apr';
        break;
      case 5:
        return 'May';
        break;
      case 6:
        return 'Jun';
        break;
      case 7:
        return 'Jul';
        break;
      case 8:
        return 'Aug';
        break;
      case 9:
        return 'Sep';
        break;
      case 10:
        return 'Oct';
        break;
      case 11:
        return 'Nov';
        break;
      case 12:
        return 'Dec';
        break;
      default:
        break;
    }
  }
}
