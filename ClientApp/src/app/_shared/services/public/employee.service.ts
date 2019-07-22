import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeSelect } from '../../intefaces/public/employee-select';
import { Employee } from '../../intefaces/public/employee';
import { EmployeeList } from '../../intefaces/public/employee-list';
import { EmployeeDetail } from '../../intefaces/public/employee-detail';
import { PagedEmployee } from '../../intefaces/public/storage/paged-employee';
import { PagingParams } from '../../intefaces/public/paging-params';
import { SortParams } from '../../intefaces/public/sort-params';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getEmployeesSelect(): Observable<EmployeeSelect[]> {
    return this.http.get<EmployeeSelect[]>(`${this.baseUrl}api/employee/select`);
  }

  getPagedEmployees(pagingParams: PagingParams, sortParams: SortParams, filter: string): Observable<PagedEmployee> {
    let queryParams = new HttpParams()
      .set('pageIndex', `${pagingParams.pageIndex}`)
      .set('pageSize', `${pagingParams.pageSize}`)
      .set('filter', `${filter}`);

    if (sortParams !== undefined) {
      queryParams = queryParams.append('sortColumn', `${sortParams.sortColumn}`);
      queryParams = queryParams.append('sortOrder', `${sortParams.sortOrder}`);
    }

    return this.http.get<PagedEmployee>(`${this.baseUrl}api/employee/paged`, {params: queryParams});
  }

  getEmployee(employeeId: number): Observable<EmployeeList> {
    return this.http.get<EmployeeList>(`${this.baseUrl}api/employee/${employeeId}`);
  }

  getEmployeeDetail(employeeId: number): Observable<EmployeeDetail> {
    return this.http.get<EmployeeDetail>(`${this.baseUrl}api/employee/${employeeId}/detail`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}api/employee`, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}api/employee`, employee);
  }

  deleteEmployee(employeeId: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseUrl}api/employee/${employeeId}`);
  }

  deleteEmployees(idList: string[]): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}api/employee/delete-all`, {
      headers: { ids: idList }
    });
  }

}
