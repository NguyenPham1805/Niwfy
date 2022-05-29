import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarChapsComponent } from './sidebar-chaps.component';

describe('SidebarChapsComponent', () => {
  let component: SidebarChapsComponent;
  let fixture: ComponentFixture<SidebarChapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarChapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarChapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
