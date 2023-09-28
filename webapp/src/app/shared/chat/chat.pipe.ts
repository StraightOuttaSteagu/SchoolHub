import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date): string {
    if (value.toDateString() != new Date().toDateString()) {
      return value.getDate().toString().padStart(2, '0') + '.' + value.getMonth().toString().padStart(2, '0') + '.' + value.getFullYear();
    } else {
      return "Today";
    }
  }
}