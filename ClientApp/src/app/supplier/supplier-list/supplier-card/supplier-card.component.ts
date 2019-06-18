import { fromEvent, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  catchError,
  finalize
} from 'rxjs/operators';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { SupplierService } from '../../_services/supplier.service';
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate} from '@angular/animations';
import { SupplierList } from '../../_interfaces/supplier-list';
import { Paging } from 'src/app/_shared/_intefaces/paging';
import { PagedSupplier } from '../../_interfaces/paged-supplier';

@Component({
  selector: 'app-supplier-card',
  templateUrl: './supplier-card.component.html',
  styleUrls: ['./supplier-card.component.scss'],
  animations: [
    trigger('flyInVez', [
      transition(':enter', [
        query(
          '.card, mat-card',
          [
            style({ opacity: 0, transform: 'translateY(100px)' }),
            stagger(30, [
              animate(
                '500ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 1, transform: 'none' })
              )
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class SupplierCardComponent implements OnInit, AfterViewInit {
  mainPhotoUrl = 'assets/default.jpg';

  suppliers: SupplierList[];
  paging: Paging;
  loading: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: true }) input: ElementRef;

  @ViewChild('mainSection', { static: true }) mainSection: ElementRef;

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 8
  };

  sortParams = <SortParams>{
    sortColumn: '',
    sortOrder: ''
  };

  constructor(private supplierService: SupplierService) {}

  ngOnInit() {
    this.loadData(this.pagingParams, this.sortParams);
  }

  ngAfterViewInit(): void {
    // Server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadSuppliersPage();
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => {
          this.loadSuppliersPage();
        })
      )
      .subscribe();
  }

  loadData(pagingParams: PagingParams, sortParams?: SortParams, filter = '') {
    this.loading = true;

    this.supplierService
      .getPagedSuppliers(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: PagedSupplier) => {
        this.suppliers = res.items;
        this.paging = res.paging;
      });
  }

  loadSuppliersPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    const filter = this.input.nativeElement.value;

    this.loadData(this.pagingParams, this.sortParams, filter);
  }

  OnPageChange(event: PageEvent) {
    this.pagingParams.pageIndex = event.pageIndex;
    this.pagingParams.pageSize = event.pageSize;
    const filter = this.input.nativeElement.value;
    this.loadData(this.pagingParams, this.sortParams, filter);

    this.mainSection.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  clearFilter() {
    this.input.nativeElement.value = null;
    this.loadSuppliersPage();
  }
}
