import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chapToSlug',
})
export class ChapSlugPipe implements PipeTransform {
  transform(value?: string): string {
    const chap = value?.split(' ')[1].replace(/[:;|\\?*%$#@!*&^()/\[\]]/g, '');
    return 'chap-' + chap;
  }
}
