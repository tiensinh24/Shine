import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cost } from '../../intefaces/public/cost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  addCost(cost: Cost): Observable<Cost> {
    return this.http.post<Cost>(`${this.baseUrl}api/cost`, cost);
  }

  updateCost(cost: Cost): Observable<Cost> {
    return this.http.put<Cost>(`${this.baseUrl}api/cost`, cost);
  }

  deleteCost(costId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}api/cost/${costId}`);
  }

}
