import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chapSlug'
})
export class ChapSlugPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
