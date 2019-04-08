import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

import { Paging } from '../_intefaces/paging';

export class TableSource<T> implements DataSource<T> {
  protected dataSubject = new BehaviorSubject<T[]>([]);
  protected pagingSubject = new BehaviorSubject<Paging>(null);
  protected loadingSubject = new BehaviorSubject<boolean>(false);

  public data = this.dataSubject.asObservable();
  public paging = this.pagingSubject.asObservable();
  public isLoading = this.loadingSubject.asObservable();

  constructor() {}

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.data;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.pagingSubject.complete();
    this.loadingSubject.complete();
  }
}
