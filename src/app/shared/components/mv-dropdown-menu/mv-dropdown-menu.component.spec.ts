import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvDropdownMenuComponent } from './mv-dropdown-menu.component';

describe('MvDropdownMenuComponent', () => {
  let component: MvDropdownMenuComponent;
  let fixture: ComponentFixture<MvDropdownMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvDropdownMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
