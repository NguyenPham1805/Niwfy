import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reaction',
})
export class ReactionPipe implements PipeTransform {
  transform(value: { [key: string]: number }, type: number): number {
    return Object.values(value).filter((item) => item === type).length;
  }
}
