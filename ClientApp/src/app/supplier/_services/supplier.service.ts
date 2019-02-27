import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierDto } from '../_interfaces/supplierDto';
import { Supplier } from '../_interfaces/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  getSupplierList(): Observable<SupplierDto[]> {
    return this.http.get<SupplierDto[]>(`${this.baseUrl}api/supplier/`);
  }

  getSupplier(id: number): Observable<SupplierDto> {
    return this.http.get<SupplierDto>(`${this.baseUrl}api/supplier/${id}`);
  }

  addSupplier(supplier: Supplier): Observable<SupplierDto> {
    return this.http.post<SupplierDto>(`${this.baseUrl}api/supplier/`, supplier);
  }

  updateSupplier(supplier: Supplier): Observable<SupplierDto> {
    return this.http.put<SupplierDto>(`${this.baseUrl}api/supplier/`, supplier);
  }

  deleteSupplier(id: number): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}api/supplier/${id}`);
  }
}
