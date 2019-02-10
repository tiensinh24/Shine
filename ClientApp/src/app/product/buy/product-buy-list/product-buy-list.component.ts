import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { map, shareReplay, tap, share } from 'rxjs/operators';

import { ProductBuyListDto } from '../_interfaces/productBuyListDto';
import { ProductBuyService } from '../_services/product-buy.service';
import { ProductBuy } from '../_interfaces/product-buy';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-buy-list',
  templateUrl: './product-buy-list.component.html',
  styleUrls: ['./product-buy-list.component.css']
})
export class ProductBuyListComponent implements OnInit {

  displayedColumns = ['name', 'specification', 'price', 'categoryName', 'actions'];
  dataSource: MatTableDataSource<ProductBuyListDto> = new MatTableDataSource([]);
  paginator: MatPaginator;
  sort: MatSort;

  @ViewChild(MatPaginator) set appPa(paginator: MatPaginator) {
    this.paginator = paginator;
    setTimeout(() => this.dataSource.paginator = this.paginator);
    // this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatSort) set appSo(sort: MatSort) {
    this.sort = sort;
    setTimeout(() => this.dataSource.sort = this.sort);
    // this.dataSource.sort = this.sort;
  }

  constructor(private productBuyService: ProductBuyService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.productBuyService.getProductList().subscribe(res => {
      this.dataSource = new MatTableDataSource<ProductBuyListDto>(res);
    });
  }

  onEdit(productBuy: ProductBuy) {
    this.router.navigate(['product-buy/edit', productBuy.productId]);
  }

  onDelete(productBuy: ProductBuy) {
    this.productBuyService.deleteProduct(productBuy.productId);
    this.getProductList();
  }

  refreshData() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}
