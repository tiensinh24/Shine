import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: boolean, args?: any): string {
    if (value) {
      return 'Male';
    } else {
      return 'Female';
    }
  }
}
