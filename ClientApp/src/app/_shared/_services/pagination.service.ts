import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { BaseQueryParams } from '../_interfaces/base-query-params';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor() {}

  getBaseQueryParams(queryParams?: BaseQueryParams): HttpHeaders {
    const headerParams = new HttpHeaders()
      .set('filter', queryParams.filter)
      .set('sortOrder', queryParams.sortOrder)
      .set('pageNumber', queryParams.pageNumber.toString())
      .set('pageSize', queryParams.pageSize.toString());

    return headerParams;
  }
}
