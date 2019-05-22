import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storages } from '../_interfaces/storages';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  getStorages(): Observable<Storages[]> {
    return this.http.get<Storages[]>(`${this.baseUrl}api/storage`);
  }
}
