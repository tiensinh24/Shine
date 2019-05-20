import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SupplierOrders } from '../../_interfaces/supplier-orders';
import { SupplierService } from '../../_services/supplier.service';

@Component({
  selector: 'app-supplier-orders',
  templateUrl: './supplier-orders.component.html',
  styleUrls: ['./supplier-orders.component.scss']
})
export class SupplierOrdersComponent implements OnInit, OnDestroy {
  supplierId = +this.route.snapshot.params.supplierId;
  orders: SupplierOrders[];

  subscription: Subscription;

  @Output() rating = new EventEmitter<number>();

  constructor(private supplierService: SupplierService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getOrders();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getOrders() {
    this.subscription = this.supplierService.getOrders(this.supplierId).subscribe((orders: SupplierOrders[]) => {
      this.orders = orders;
      console.log(this.orders);
    });
  }
}
