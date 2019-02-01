import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ProductsBuyDto } from '../_interfaces/productsBuyDto';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ProductBuyService } from '../_services/product-buy.service';

@Component({
  selector: 'app-product-buy-list',
  templateUrl: './product-buy-list.component.html',
  styleUrls: ['./product-buy-list.component.css']
})
export class ProductBuyListComponent implements OnInit {
  displayedColumns = ['name', 'specification', 'price', 'categoryName', 'actions'];
  dataSource: MatTableDataSource<ProductsBuyDto> = new MatTableDataSource([]);
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

  constructor(private productBuyService: ProductBuyService) {
    this.ngOnInit();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.productBuyService.getProductList().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
    }, error => console.error(error));
  }

  onSubmit() {
    
  }

  deleteProduct(id: number) {
    this.productBuyService.deleteProduct(id).subscribe();
  }

}
