import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvDropdownSubmenuComponent } from './mv-dropdown-submenu.component';

describe('MvDropdownSubmenuComponent', () => {
  let component: MvDropdownSubmenuComponent;
  let fixture: ComponentFixture<MvDropdownSubmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvDropdownSubmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvDropdownSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
