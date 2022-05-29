import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebounceClickDirective } from './debounce-click.directive';
import { ScrollTopDirective } from './scroll-top.directive';

@NgModule({
  declarations: [DebounceClickDirective, ScrollTopDirective],
  imports: [CommonModule],
  exports: [DebounceClickDirective, ScrollTopDirective],
})
export class DirectivesModule {}
