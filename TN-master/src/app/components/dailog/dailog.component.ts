import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss'],
})
export class DailogComponent {
  public isDarkTheme$!: Observable<boolean>;

  constructor(public dialogRef: MatDialogRef<DailogComponent>) {}
}
