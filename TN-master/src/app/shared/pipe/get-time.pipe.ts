import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTime',
})
export class GetTimePipe implements PipeTransform {
  transform(value: number | undefined | null): number {
    if (!value) return Date.now();
    return value * 1000;
  }
}
