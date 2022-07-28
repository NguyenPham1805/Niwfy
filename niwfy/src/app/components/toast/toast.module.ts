import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastItemComponent } from './toast-item/toast-item.component';

@NgModule({
  declarations: [ToastComponent, ToastItemComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ToastComponent],
})
export class ToastModule {}
