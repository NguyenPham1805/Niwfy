import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChapComponent } from './list-chap.component';

describe('ListChapComponent', () => {
  let component: ListChapComponent;
  let fixture: ComponentFixture<ListChapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
