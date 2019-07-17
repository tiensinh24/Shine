import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { OrderBuyService } from 'src/app/_shared/services/buy/order-buy.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderNumberExistValidator implements AsyncValidator {
  constructor(private orderService: OrderBuyService) {}

  validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    return this.orderService
      .isOrderNumberExist(control.value)
      .pipe(map(isExist => (isExist ? { exist: true } : null), catchError(() => null)));
  }
}
