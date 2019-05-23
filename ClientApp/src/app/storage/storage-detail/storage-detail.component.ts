import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageProductsList } from '../_interfaces/storage-products-list';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-storage-detail',
  templateUrl: './storage-detail.component.html',
  styleUrls: ['./storage-detail.component.scss']
})
export class StorageDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  storageId = +this.route.snapshot.params.storageId;

  latestImportProducts: StorageProductsList[] = [];
  latestExportProducts: StorageProductsList[] = [];

  constructor(private storageService: StorageService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initialize() {
    this.getLatestImportProducts(this.storageId);
    this.getLatestExportProducts(this.storageId);
  }

  getLatestImportProducts(storageId: number) {
    this.subscription = this.storageService
      .getLatestImportProducts(storageId)
      .subscribe((products: StorageProductsList[]) => {
        this.latestImportProducts = products;
      });
  }

  getLatestExportProducts(storageId: number) {
    this.subscription = this.storageService
      .getLatestExportProducts(storageId)
      .subscribe((products: StorageProductsList[]) => {
        this.latestExportProducts = products;
      });
  }
}
