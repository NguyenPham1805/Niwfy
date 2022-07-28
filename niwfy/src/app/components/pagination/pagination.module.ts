import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, RouterModule, MatIconModule, FormsModule],
  exports: [PaginationComponent],
})
export class PaginationModule {}
