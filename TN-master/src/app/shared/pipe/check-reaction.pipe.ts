import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkReaction',
})
export class CheckReactionPipe implements PipeTransform {
  transform(
    reaction: { [key: string]: number },
    uid: string | undefined,
    type: number
  ): boolean {
    if (!uid) return false;
    return Object.entries(reaction).find((key) => key[0] === uid)?.[1] === type;
  }
}
