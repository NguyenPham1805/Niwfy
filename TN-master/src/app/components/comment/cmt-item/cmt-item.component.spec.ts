import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmtItemComponent } from './cmt-item.component';

describe('CmtItemComponent', () => {
  let component: CmtItemComponent;
  let fixture: ComponentFixture<CmtItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmtItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmtItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
