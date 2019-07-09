import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../../intefaces/public/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  addPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}api/payment`, payment);
  }

  updatePayment(payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.baseUrl}api/payment`, payment);
  }

  deletePayment(paymentId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}api/payment/${paymentId}`);
  }
}
