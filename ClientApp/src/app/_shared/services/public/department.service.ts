import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentSelect } from '../../intefaces/public/department/department-select';
import { Department } from '../../intefaces/public/department/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getDepartmentsSelect(): Observable<DepartmentSelect[]> {
    return this.http.get<DepartmentSelect[]>(`${this.baseUrl}api/department/select`);
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.baseUrl}api/department`, department);
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.baseUrl}api/department`, department);
  }

  deleteDepartment(departmentId: number): Observable<Department> {
    return this.http.delete<Department>(`${this.baseUrl}api/department/${departmentId}`);
  }
}
