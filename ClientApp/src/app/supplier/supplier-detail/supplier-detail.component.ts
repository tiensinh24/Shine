import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { SupplierService } from '../_services/supplier.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {
  displayedcolumn = ['productName', 'specification', 'actions'];
  supplier: any;
  supplierGroup = new MatTableDataSource<any>([]);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private supplierService: SupplierService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.supplierId;
    this.supplierService.getProductsBySupplier(id).subscribe(res => {
      this.supplier = res.supplier;
      this.supplierGroup = new MatTableDataSource<any>(res.products);
        setTimeout(() => (this.supplierGroup.sort = this.sort));
        setTimeout(() => (this.supplierGroup.paginator = this.paginator));
    });
  }



}
