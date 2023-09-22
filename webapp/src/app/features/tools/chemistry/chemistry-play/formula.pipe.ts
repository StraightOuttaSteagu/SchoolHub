import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formula'
})
export class SubscriptPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\d+/g, (match) => `<sub>${match}</sub>`);
  }
}