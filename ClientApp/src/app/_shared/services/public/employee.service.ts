import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeSelect } from '../../intefaces/public/employee-select';
import { Employee } from '../../intefaces/public/employee';
import { EmployeeList } from '../../intefaces/public/employee-list';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getEmployeesSelect(): Observable<EmployeeSelect[]> {
    return this.http.get<EmployeeSelect[]>(`${this.baseUrl}api/employee/select`);
  }

  getEmployee(employeeId: number): Observable<EmployeeList> {
    return this.http.get<EmployeeList>(`${this.baseUrl}api/employee/${employeeId}`);
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
}
