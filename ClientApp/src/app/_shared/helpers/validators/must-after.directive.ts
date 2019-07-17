import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustAfterValidator(firstControl: string, secondControl: string) {
  return (formGroup: FormGroup) => {
    const first = formGroup.controls[firstControl];
    const second = formGroup.controls[secondControl];

    if (second.errors && !second.errors.mustAfter) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (first.value > second.value) {
      second.setErrors({ mustAfter: true });
    } else {
      second.setErrors(null);
    }
  };
}
