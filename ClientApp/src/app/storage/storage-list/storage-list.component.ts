import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Storages } from '../_interfaces/storages';
import { StorageService } from '../_services/storage.service';

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
