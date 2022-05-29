import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'nf-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input('current-page') currentPage = 1;
  @Input('total-page') totalPage = 450;

  @Output('change-page') onChangePage = new EventEmitter<number>();
  @Output('check-page') onCheckPage = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
