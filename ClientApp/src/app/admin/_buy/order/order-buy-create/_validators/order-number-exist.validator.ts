import { FormGroup } from '@angular/forms';
import { OrderBuyService } from 'src/app/_shared/services/buy/order-buy.service';

export function OrderNumberExistValidator() {
  return (formGroup: FormGroup, orderService: OrderBuyService) => {
    const orderNumberControl = formGroup.controls.orderNumber;
    let chk = false;
    orderService.isOrderNumberExist(orderNumberControl.value).subscribe(res => {
      this.chk = res;
    });

    if (orderNumberControl.errors && !orderNumberControl.errors.exist) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    if (chk) {
      orderNumberControl.setErrors({ exist: true });
    } else {
      orderNumberControl.setErrors(null);
    }
  };
}
