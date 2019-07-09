import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Storages } from 'src/app/_shared/intefaces/public/storage/storages';
import { StorageService } from 'src/app/_shared/services/public/storage.service';

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.scss']
})
export class StorageListComponent implements OnInit, OnDestroy {
  storages: Storages[];

  subscription: Subscription;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.getStorages();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getStorages() {
    this.subscription = this.storageService.getStorages().subscribe((storages: Storages[]) => {
      this.storages = storages;
    });
  }
}
