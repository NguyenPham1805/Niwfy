import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DailogComponent } from './dailog.component';

@NgModule({
  declarations: [DailogComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [DailogComponent],
})
export class DailogModule {}
