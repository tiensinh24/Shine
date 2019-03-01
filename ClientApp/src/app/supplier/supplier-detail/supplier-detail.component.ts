import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SupplierService } from '../_services/supplier.service';
import { ProductsBySupplier } from '../_interfaces/products-buy-supplier';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {
  supplierGroup: ProductsBySupplier;
  displayedcolumn = ['productName', 'specification', 'actions']

  constructor(private supplierService: SupplierService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.supplierId;
    this.supplierService.getProductsBySupplier(id).subscribe(res => {
      this.supplierGroup = res;
    });
  }



}
