import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ProductsDto } from '../_interfaces/productsDto';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns = ['name', 'specification', 'price', 'productType', 'categoryName'];
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

  constructor(private productService: ProductService) {
    this.ngOnInit();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.productService.getProductList().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
    }, error => console.error(error));
  }

}
