import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Storages } from 'src/app/_shared/intefaces/public/storage/storages';
import { StorageProductsList } from 'src/app/_shared/intefaces/public/storage/storage-products-list';
import { StorageService } from 'src/app/_shared/services/public/storage.service';

@Component({
  selector: 'app-storage-detail',
  templateUrl: './storage-detail.component.html',
  styleUrls: ['./storage-detail.component.scss']
})
export class StorageDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  storageId = +this.route.snapshot.params.storageId;
  storage = <Storages>{};

  latestImportProducts: StorageProductsList[] = [];
  latestExportProducts: StorageProductsList[] = [];

  constructor(private storageService: StorageService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initialize() {
    this.getStorage(this.storageId);
    this.getLatestImportProducts(this.storageId);
    this.getLatestExportProducts(this.storageId);
  }

  getStorage(storageId: number) {
    this.subscription = this.storageService.getStorage(storageId).subscribe((storage: Storages) => {
      this.storage = storage;
    });
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

  goToAddImport() {
    this.router.navigate([`/admin/storage/${this.storageId}/add-import`]);
  }

  goToStorageProductsList() {
    this.router.navigate([`/admin/storage/${this.storageId}/storage-products`]);
  }
}
