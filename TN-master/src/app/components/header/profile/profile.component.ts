import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentUser } from 'src/app/shared/types/user.interface';

@Component({
  selector: 'nf-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Output('open') onProfileOpen = new EventEmitter();
  @Input() isOpen: boolean = false;
  @Input('dark-theme') isDarkTheme: boolean = true;
  @Input() user: CurrentUser | null = null;

  constructor() {}

  ngOnInit(): void {}
}
