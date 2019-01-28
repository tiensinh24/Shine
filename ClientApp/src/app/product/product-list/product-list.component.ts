import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsDto } from '../_interfaces/productsDto';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns = ['name', 'specification', 'price', 'productType', 'categoryId'];
  dataSource: MatTableDataSource<ProductsDto> = new MatTableDataSource([]);
  paginator: MatPaginator;
  sort: MatSort;

  @ViewChild(MatPaginator) set appPa(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatSort) set appSo(sort: MatSort) {
    this.sort = sort;
    this.dataSource.sort = this.sort;
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.http.get<ProductsDto[]>(this.baseUrl + 'api/product').subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
    }, error => console.error(error));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
  }

}
